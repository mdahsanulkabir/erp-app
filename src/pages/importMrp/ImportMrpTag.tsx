import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, 
    // ICellRendererParams, 
    // ValueFormatterParams 
} from 'ag-grid-community';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Modal from '../../utils/modal/Modal';
import CreateImportRmRequirementTag from '../../components/mrp/CreateImportRmRequirementTag';

interface IRow {
    sl: number;
    importRmRequirementTag: string;
}


const ImportMrpTag = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/mrpImport/tag');
                console.log(response?.data);
                const tags = response?.data?.map((tag: IRow, index:number) => ({
                    sl: index+1,
                    importRmRequirementTag: tag.importRmRequirementTag,
                }))
                console.log(tags)
                setRowData(tags);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])

    const [colDefs] = useState<ColDef[]>([
        {
          field: "sl", 
          width: 100,
          checkboxSelection: true
        },
        // {
        //   field: "skuCode", 
        //   width: 250,
        // //   cellRenderer: CompanyLogoRenderer 
        // },
        {
          field: "importRmRequirementTag", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
    ]);

    // Apply settings across all columns
    const defaultColDef = useMemo<ColDef>(() => {
        return {
        filter: true,
        editable: true
        };
    }, []);


    //Modal for creating supplier
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div style={{width: '200px'}}>
                <h1>Import MRP Requirement Tag List</h1>
                <br />
                <button onClick={toggleModal}>Add Tag</button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <CreateImportRmRequirementTag rowData={rowData} setRowData={setRowData}/>
                </Modal>
            </div>
            <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '100%', flex: 1 }}>
                <AgGridReact 
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    rowSelection='multiple'
                    onSelectionChanged={() => console.log('Row Selected!')}
                    onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
                />
            </div>
        </div>
    )
};

export default ImportMrpTag;