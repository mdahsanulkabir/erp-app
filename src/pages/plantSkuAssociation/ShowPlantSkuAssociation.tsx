import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {
    ColDef,
    // ICellRendererParams, 
    // ValueFormatterParams 
} from 'ag-grid-community';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Modal from '../../utils/modal/Modal';
import CreatePlantSkuAssociation from '../admin/createPlantSkuAssociation/CreatePlantSkuAssociation';

// // Custom Cell Renderer (Display logos based on cell value)
// const CompanyLogoRenderer = (params: ICellRendererParams) => (
//     <span style={{ display: "flex", height: "100%", width: "100%", alignItems: "center" }}>
//         {
//             params.value && 
//             <img 
//                 alt={`${params.value} Flag`} 
//                 src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`} 
//                 style={{display: "block", width: "25px", height: "auto", maxHeight: "50%", marginRight: "12px", filter: "brightness(1.1)"}} 
//             />
//         }
//         <p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
//             {params.value}
//         </p>
//     </span>
// );

// /* Custom Cell Renderer (Display tick / cross in 'Successful' column) */
// const MissionResultRenderer = (params: ICellRendererParams) => (
//   <span style={{ display: "flex", justifyContent: "center", height: "100%", alignItems: "center"}}>{<img alt={`${params.value}`} src={`https://www.ag-grid.com/example-assets/icons/${params.value ? 'tick-in-circle' : 'cross-in-circle'}.png`} style={{width: "auto", height: "auto"}} />}</span>
// );

// /* Format Date Cells */
// const dateFormatter = (params: ValueFormatterParams): string => {
//   return new Date(params.value).toLocaleDateString("en-us", {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// Row Data Interface
interface IRow {
    id: string;
    plantId: string;
    sKUId: string;
    createdBy: string;
    createdAt: Date;
    plant : {
        id: string;
        plantCode: number;
        plantName:string;
    }
    sku: {
        skuCode: string;
    }
}

const ShowPlantSkuAssociation = () => {
    const [rowData, setRowData] = useState<IRow[] | null>(null);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/plant/sku-association');
                console.log(response?.data);
                const plantSkus = await response?.data?.map((plantSku: IRow) => ({
                    plantSkuId: plantSku.id,
                    plantName: plantSku.plant.plantName,
                    PlantId: plantSku.plantId,
                    plantCode: plantSku.plant.plantCode,
                    sKUId: plantSku.sKUId,
                    skuCode: plantSku.sku.skuCode
                }))
                console.log(plantSkus)
                setRowData(plantSkus);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

    }, [axiosPrivate])

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef[]>([
        {
            field: "skuCode",
            width: 300,
            checkboxSelection: true
        },
        {
            field: "plantName",
            width: 130,
            //   cellRenderer: CompanyLogoRenderer 
        }
    ]);



    // Apply settings across all columns
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            filter: true,
            editable: true
        };
    }, []);

    const handleAddNew = () => {
        alert("Add New Item")
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '200px' }}>
                <h1>Plant - SKU</h1>
                <button onClick={handleAddNew} style={{ width: '100%' }}>Add New</button>

                <button onClick={toggleModal}>Open Overlay</button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <CreatePlantSkuAssociation />
                </Modal>

            </div>
            <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '100%' }}>
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
    );
};

export default ShowPlantSkuAssociation;