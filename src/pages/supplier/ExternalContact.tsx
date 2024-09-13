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
import CreateExternalContact from '../../components/supplier/CreateExternalContact';

interface IRow {
    sl?: number;
    name: string;
    email: string;
    phone: string;
    Supplier: {
        supplierName: string;
    }
    supplierId: string;
}

const ExternalContact = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/supplier/contact');
                console.log(response?.data);
                const extContacts = response?.data?.map((extContact: IRow, index:number) => ({
                    sl: index+1,
                    name: extContact.name,
                    email: extContact.email,
                    phone: extContact.phone,
                    supplierName: extContact.Supplier.supplierName,
                    supplierId: extContact.supplierId,
                }))
                console.log(extContacts)
                setRowData(extContacts);

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
          field: "name", 
          width: 300,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "email", 
          width: 200,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "phone", 
          width: 150,
        //   cellRenderer: CompanyLogoRenderer 
        },
        {
          field: "supplierName", 
          width: 350,
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
            <h1>External Contacts</h1>
            <br />
            <button onClick={toggleModal}>Add External Contact</button>
            <Modal isOpen={isOpen} onClose={toggleModal}>
                <CreateExternalContact rowData={rowData} setRowData={setRowData}/>
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
}

export default ExternalContact;