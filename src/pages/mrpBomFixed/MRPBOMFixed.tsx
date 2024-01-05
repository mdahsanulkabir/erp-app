import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {
    ColDef,
    // ICellRendererParams, 
    ValueFormatterParams
} from 'ag-grid-community';
import * as XLSX from 'xlsx';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRow } from '../skus/Skus'

interface IRowUploaded {
    id: string;
    slNo: number;
    objectId: string;
    objectName: string;
    sisCode: string;
    unit: string;
    qty: number;
}

interface ISaveMRPFIXEDBOM {
    productCode: string;
}

const MRPBOMFixed = () => {
    const [rowDataUploaded, setRowDataUploaded] = useState<IRowUploaded[]>([]);
    const axiosPrivate = useAxiosPrivate();

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState<ColDef[]>([
        {
            field: "slNo",
            width: 100,
            checkboxSelection: true
        },
        {
            field: "objectId",
            width: 150,
            valueFormatter: (params: ValueFormatterParams) => { return params.value.toString() }
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
            field: "objectName",
            width: 300,
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
            field: "sisCode",
            width: 250,
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
            field: "unit",
            width: 100,
            //   cellRenderer: CompanyLogoRenderer 
        },
        {
            field: "qty",
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
            //setPOList(jsonData)  //setSupplierList(jsonData)
            console.log("uploaded raw data", jsonData);
            setRowDataUploaded(jsonData)
        }
    }



    const { register, handleSubmit, formState: { errors }, } = useForm<ISaveMRPFIXEDBOM>()

    const onSubmit: SubmitHandler<ISaveMRPFIXEDBOM> = async (formData) => {
        
        try {
            console.log({
                ...formData,
                rms: [rowDataUploaded.map(rm => ({
                    id: rm.id,
                    quantity: rm.qty
                }))]
            })
            const response = await axiosPrivate.post('/fixedMRPBOM/mrpBom',
                JSON.stringify({
                    ...formData,
                    rms: rowDataUploaded.map(rm => {
                        return {
                            id : rm.id,
                            quantity: rm.qty
                        }
                    })
                }),
            )
            console.log(response?.data)

            
        } catch (err) {
            console.log(err)
        }
    }

    const [skus, setSkus] = useState<IRow[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/product/sku');
                console.log("skus", response?.data);
                setSkus(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

    }, [axiosPrivate])


    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '200px' }}>
                <h1>Fixed MRP</h1>
                {/* <button onClick={handleAddNew} style={{width: '100%'}}>Add New</button>
                
                <button onClick={toggleModal}>Open Overlay</button>
                <Modal isOpen={isOpen} onClose={toggleModal}>
                    <ProductBaseAdmin />
                </Modal> */}
                <label htmlFor='upload'>Choose File (xlsx, xls)</label>
                <input type="file" name="upload" id="upload" onChange={(e) => uploadFile(e)} />
            </div>
            <div className={"ag-theme-quartz-dark"} style={{ width: '100%', height: '100%' }}>
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
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Save in Database</h1>
                    <label>Product SIS Code</label>
                    {/* <input {...register("productCode", { required: true })} /> */}
                    <select id="product-select" {...register("productCode", { required: true })}>
                        <option value="">--Please choose a SKU--</option>
                        {
                            skus?.map(sku => (
                                <option key={sku.skuId} value={sku.skuId}>
                                    {sku.skuCode}
                                </option>
                            ))
                        }
                    </select>
                    {errors.productCode?.type === "required" && (
                        <p role="alert">Product SIS Code is required</p>
                    )}
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default MRPBOMFixed;