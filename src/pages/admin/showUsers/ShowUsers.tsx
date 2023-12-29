import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, 
    // ICellRendererParams, 
    // ValueFormatterParams 
} from 'ag-grid-community';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

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
    userName: string;
    userArcelikId: number;
    userSingerId: string;
    userEmail: string;
    departmentName: string;
    roles: number[]
}

const ShowUsers = () => {
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
                const response = await axiosPrivate.get('/getUsers');
                console.log(response?.data);
                const users = response?.data?.map((user: { userName: string; userSingerId: string; userArcelikId: number; userEmail: string; userDepartment: { departmentName: string; }; roles: { id: number; }[]; }) => ({
                    userName:user.userName,
                    userArcelikId: user.userSingerId,
                    userSingerId:user.userArcelikId,
                    userEmail:user.userEmail,
                    departmentName: user.userDepartment.departmentName,
                    roles: user.roles.map((role: { id: number; }) => role.id)
                }))
                console.log(users)
                setRowData(users);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        
    }, [axiosPrivate])
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "userName", 
      width: 220,
      checkboxSelection: true
    },
    {
      field: "userArcelikId", 
      width: 150,
    //   cellRenderer: CompanyLogoRenderer 
    },
    {
      field: "userSingerId",
      width: 150
    },
    {
      field: "userEmail",
      width: 280,
    //   valueFormatter: dateFormatter
    },
    {
      field: "departmentName",
      width: 200,
    //   valueFormatter: (params: ValueFormatterParams) => { return '£' + params.value.toLocaleString(); } 
    },
    {
      field: "roles", 
      width: 100,
    //   cellRenderer: MissionResultRenderer 
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

export default ShowUsers;