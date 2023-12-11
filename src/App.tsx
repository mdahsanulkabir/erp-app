import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login";
import CreateUser from "./pages/admin/createUser/CreateUser";
import CreateDepartment from "./pages/admin/createDepartment/CreateDepartment";
import CreateRole from "./pages/admin/createRole/CreateRole";
import Home from "./pages/home/Home";
import RequireAuth from "./components/other/RequireAuth";
import LinkPage from "./components/other/LinkPage";
import Unauthorized from "./components/other/Unauthorized";
import ProductCapacityUnit from "./pages/admin/ProductCapacityUnit/ProductCapacityUnit";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='login' element={<Login/>} />
        <Route path='linkpage' element={<LinkPage/>} />
        <Route path='unauthorized' element={<Unauthorized/>} />

        <Route element={<RequireAuth allowedRoles={[5001]}/>}>
          <Route path='/' element={<Home/>} />
          <Route path='create-user' element={<CreateUser/>} />
          <Route path='create-department' element={<CreateDepartment/>} />
          <Route path='create-role' element={<CreateRole/>} />
          <Route path='product-capacity-unit' element={<ProductCapacityUnit/>} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App
