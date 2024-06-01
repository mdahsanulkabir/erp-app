import { useState, useEffect, useMemo, useRef } from 'react';
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
import Plant from '../admin/createPlant/Plant';
import { createProductionTable } from '../../utils/createTable/createProductionTable';
import useGetAllSkus from '../../hooks/skus/useGetAllSkus';
import useGetPlants from '../../hooks/plant/useGetPlants';

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
    plantName: string;
    skuCode: string;
    quantities: { [date: string]: number };
}

const ShowProduction = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)))
    const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(new Date().getDate() - 1)))
    const axiosPrivate = useAxiosPrivate();
    const allSkus = useGetAllSkus();
    const plants = useGetPlants();
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState<ColDef[]>([
        // {
        //     field: "plantName",
        //     width: 100,
        // },
        // {
        //     field: "skuCode",
        //     width: 250,
        // },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(`/production/dailyRawProduction?startDate=${startDate}&endDate=${endDate}`);
                const data = createProductionTable(response?.data?.allProductionData, startDate, endDate, allSkus, plants)
                console.log("data", data)
                const keys = Object.keys(data[0])
                const newDefs = keys.map(key => {
                    if (key === 'plantName' || key === 'skuCode') {
                        return {
                            headerName: key,
                            field: key,
                            width: 200
                        }
                    }
                    else {
                        const dateKeys = Object.keys(data[0].quantities)
                        dateKeys.forEach((key, value) => {
                            return {
                                headerName: key,
                                valueGetter: (p) => p.data.quantities[key],
                                width: 200
                            }
                        })
                    }
                })
                console.log("newdef", newDefs)
                setColDefs(
                    newDefs
                )
                const productionEntries = data.map((record: IRow) => {
                    return {
                        plantName: record.plantName,
                        skuCode: record.skuCode,
                        ...record.quantities
                    }
                })
                console.log("production entries", productionEntries)
                setRowData(productionEntries);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

    }, [allSkus, axiosPrivate, endDate, plants, startDate])





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


    const startDateRef = useRef<HTMLInputElement>(null)
    const endDateRef = useRef<HTMLInputElement>(null)
    const getProductionData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Update state with the values from the input fields
        if (startDateRef.current && endDateRef.current) {
            setStartDate(new Date(startDateRef.current.value));
            setEndDate(new Date(endDateRef.current.value));
        }
    }
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '200px' }}>
                <h1>Plants</h1>
                <button onClick={handleAddNew} style={{ width: '100%' }}>Add New</button>

                <button onClick={toggleModal}>Open Overlay</button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <Plant />
                </Modal>

                <form onSubmit={getProductionData}>
                    <label>Start Date</label>
                    <input type="date" name="" id="" ref={startDateRef} />
                    <br />
                    <label>End Date</label>
                    <input type="date" name="" id="" ref={endDateRef} />
                    <button type='submit'>Search Production Data</button>
                </form>

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

export default ShowProduction;