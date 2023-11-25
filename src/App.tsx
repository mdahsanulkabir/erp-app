import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login";
import CreateUser from "./pages/admin/createUser/CreateUser";
import CreateDepartment from "./pages/admin/createDepartment/CreateDepartment";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='login' element={<Login/>} />
        <Route path='create-user' element={<CreateUser/>} />
        <Route path='create-department' element={<CreateDepartment/>} />
      </Route>
    </Routes>
  )
}

export default App
