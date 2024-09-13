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
export interface IRow {
    skuId: string
    skuCode: string;
    skuSAPCode: string;
    productVariantId: string;
    productVariant: string;
    productBaseId: string;
    baseProduct: string;
    productCapacity: number;
    productCapacityUnitId: string;
    seriesCategoryId: string;
    seriesName: string;
    feature: string;
    picture1: string;
    picture2: string;
    picture3: string;
    picture4: string;
    picture5: string;
    obsolete: string;
    comment: string;
}

const Skus = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const axiosPrivate = useAxiosPrivate();
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/product/sku');
                console.log(response?.data);
                const skus = response?.data?.map((sku: IRow) => ({
                  skuId: sku.skuId,
                  skuCode: sku.skuCode,
                  skuSAPCode: sku.skuSAPCode,
                  productVariantId: sku.productVariantId,
                  productVariant: sku.productVariant,
                  productBaseId: sku.productBaseId,
                  baseProduct: sku.baseProduct,
                  productCapacity: sku.productCapacity,
                  productCapacityUnitId: sku.productCapacityUnitId,
                  seriesCategoryId: sku.seriesCategoryId,
                  seriesName: sku.seriesName,
                  feature: sku.feature,
                  picture1: sku.picture1,
                  picture2: sku.picture2,
                  picture3: sku.picture3,
                  picture4: sku.picture4,
                  picture5: sku.picture5,
                  obsolete: sku.obsolete,
                  comment: sku.comment,
                }))
                console.log(skus)
                setRowData(skus);

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
      width: 280,
      checkboxSelection: true
    },
    // {
    //   field: "skuCode", 
    //   width: 250,
    // //   cellRenderer: CompanyLogoRenderer 
    // },
    {
      field: "skuSAPCode", 
      width: 280,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "productVariant", 
      width: 150,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "productCapacity", 
      width: 150,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "productCapacityUnitId", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "seriesName", 
      width: 200,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "picture1", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "picture2", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "picture3", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "picture4", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "picture5", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "obsolete", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "comment", 
      width: 250,
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

export default Skus;