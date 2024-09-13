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
    User : {userName: string;}
    alternativeName: string;
    color: string;
    comment: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    dimension: string;
    drawing: string;
    id: string;
    objectId: string;
    objectName: string;
    obsolute: boolean;
    picture1: string;
    picture2: string;
    picture3: string;
    picture4: string;
    picture5: string;
    rmUnit: {
        rmUnit: string;
    }
    rmUnitId: string;
    sapCode: string;
    sisCode: string;
    updateReasons: string;
}

// interface IUserData { 
//     userName: string; 
//     userSingerId: string; 
//     userArcelikId: number; 
//     userEmail: string; 
//     userDepartment: { 
//         departmentName: string; 
//     }; 
//     roles: IRole[]; 
// }

// interface IRole { 
//     id: number; 
// }

const Rm = () => {
    const [rowData, setRowData] = useState<IRow[]>([]);
    const axiosPrivate = useAxiosPrivate();
    // Fetch data & update rowData state
    // useEffect(() => {
    //     fetch('http://localhost:5000/getUsers')
    //     .then(result => result.json())
    //     .then(rowData => {console.log(rowData);setRowData(rowData);})
    // }, [])
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/rm/rmDefinition');
                console.log(response?.data);
                const rms = response?.data?.map((rm: IRow) => ({
                    objectId: rm.objectId,
                    sisCode: rm.sisCode,
                    sapCode: rm.sapCode,
                    objectName: rm.objectName,
                    alternativeName: rm.alternativeName,
                    rmUnit: rm.rmUnit.rmUnit,
                    dimension: rm.dimension,
                    drawing: rm.drawing,
                    color: rm.color,
                    picture1: rm.picture1,
                    picture2: rm.picture2,
                    picture3: rm.picture3,
                    picture4: rm.picture4,
                    picture5: rm.picture5,
                    User: rm.User.userName,
                    createdAt: rm.createdAt,
                    updatedAt: rm.updatedAt,
                    updateReasons: rm.updateReasons,
                    comment: rm.comment,
                    obsolete: rm.obsolute
                }))
                console.log(rms)
                setRowData(rms);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "objectId", 
      width: 200,
      checkboxSelection: true
    },
    {
      field: "sisCode", 
      width: 250,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "sapCode",
      width: 150
    },
    {
      field: "objectName",
      width: 280,
    //   valueFormatter: dateFormatter
    },
    {
      field: "alternativeName",
      width: 200,
    //   valueFormatter: (params: ValueFormatterParams) => { return '£' + params.value.toLocaleString(); } 
    },
    {
      field: "rmUnit", 
      width: 100,
    //   cellRenderer: MissionResultRenderer 
    },
    {
        field: "dimension",
        width: 150
    },
    {
        field: "drawing",
        width: 150
    },
    {
        field: "color",
        width: 150
    },
    {
        field: "User",
        width: 150,
        headerName: 'Created By'
    },
    {
        field: "obsolete",
        width: 150
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

export default Rm;