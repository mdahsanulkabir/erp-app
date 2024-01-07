import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, 
    // ICellRendererParams, 
    ValueFormatterParams 
} from 'ag-grid-community';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import * as XLSX from 'xlsx';

interface IRowUploaded {
    slNo: number;
    objectId: string;
    factoryObjectId: string;
    sisCode: string;
    objectName: string;
    bomUnit: string;
    supplierId: string;
    supplierName: string;
    supplierRmUnitId: string;
    supplierUnit: string;
    currencyId: string;
    currency: string;
}

const SupplierRmFromUpload = () => {
    const [rowDataUploaded, setRowDataUploaded] = useState<IRowUploaded[]>([]);
    const axiosPrivate = useAxiosPrivate();

    const [colDefs] = useState<ColDef[]>([
        {
            field: "slNo", 
            width: 100,
            checkboxSelection: true
        },
        {
            field: "objectId",
            width: 400,
            
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
            field: "factoryObjectId", 
            width: 150,
            valueFormatter: (params: ValueFormatterParams) => { return params.value.toString() }
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "sisCode", 
          width: 200,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "objectName", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "bomUnit", 
          width: 150,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "supplierId", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "supplierName", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "supplierRmUnitId", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "supplierUnit", 
          width: 150,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "currencyId", 
          width: 400,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "currency", 
          width: 100,
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

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const file = e.target.files?.[0];
        if (file) {
            const data = await file.arrayBuffer();
            const workBook = XLSX.read(data);
            const worksheet = workBook.Sheets[workBook.SheetNames[0]];
            const jsonData: IRowUploaded[] = XLSX.utils.sheet_to_json(worksheet);
            console.log("uploaded raw data", jsonData);
            setRowDataUploaded(jsonData)
        }
    }

    const handleSubmit = async () => {
        try {
            const someSupplierRm = rowDataUploaded.map(rmData => ({
                objectId: rmData.objectId,
                supplierId: rmData.supplierId,
                supplierRmUnitId: rmData.supplierRmUnitId,
                currencyId: rmData.currencyId
            }))
            console.log(someSupplierRm)
            const response = await axiosPrivate.post('/supplierRm/createMany',
                JSON.stringify(someSupplierRm),
            )
            console.log(response?.data)

            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{display: 'flex', height: '100%'}}>
            <div style={{width: '200px'}}>
                <h1>Supplier RM List</h1>
                <br />
                {/* <button onClick={toggleModal}>Add Supplier</button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <CreateSupplierRm rowData={rowData} setRowData={setRowData}/>
                </Modal> */}
                <label htmlFor='upload'>Choose File (xlsx, xls)</label>
                <input type="file" name="upload" id="upload" onChange={(e) => uploadFile(e)}/>
                <br />
                <hr />
                <h1>Save in database</h1>
                <button onClick={handleSubmit}>Save</button>
            </div>
            <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '100%', flex: 1 }}>
                <AgGridReact 
                    rowData={rowDataUploaded}
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

export default SupplierRmFromUpload;