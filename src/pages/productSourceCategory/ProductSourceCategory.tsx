import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, 
    // ICellRendererParams, 
    // ValueFormatterParams 
} from 'ag-grid-community';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
    sourceCategory: string;
    productBaseId: string;
    createdAt: Date;
    updatedAt: Date;
    updateReason: string;
    comment: string;
    productBase: {
      id: string;
      baseProduct: string;
      comment:string;
      createdAt: Date;
      updatedAt: Date;
      updateReason: string;
      productCapacityUnitId: string;
    }

}

const ShowProductSourceCategory = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/product/productSourceCategory');
                console.log(response?.data);
                const productSourceCategories = response?.data?.map((productBase: IRow) => ({
                  id: productBase.id,
                  sourceCategory: productBase.sourceCategory,
                  comment: productBase.comment,
                  createdAt: productBase.createdAt,
                  productCapacityUnitId: productBase.productBase.productCapacityUnitId,
                  baseProduct: productBase.productBase.baseProduct
                }))
                console.log(productSourceCategories)
                setRowData(productSourceCategories);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "sourceCategory", 
      width: 200,
      checkboxSelection: true
    },
    {
      field: "baseProduct", 
      width: 250,
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

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{display: 'flex', height: '100%'}}>
        <div style={{width: '200px'}}>
            <h1>Hello</h1>
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
  );
};

export default ShowProductSourceCategory;