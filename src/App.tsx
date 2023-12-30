import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout"
import Login from "./pages/login/Login";
import CreateUser from "./pages/admin/createUser/CreateUser";
import CreateDepartment from "./pages/admin/createDepartment/CreateDepartment";
import CreateRole from "./pages/admin/createRole/CreateRole";
import Home from "./pages/home/Home";
import RequireAuth from "./components/other/RequireAuth";
import PersistLogin from "./components/other/PersistLogin";
import LinkPage from "./components/other/LinkPage";
import Unauthorized from "./components/other/Unauthorized";
import ProductCapacityUnit from "./pages/admin/productCapacityUnit/ProductCapacityUnit";
import ProductVariant from "./pages/admin/productVariant/ProductVariant";
import ProductSeries from "./pages/admin/createProductSeries/ProductSeries";
import ProductSourceCategory from "./pages/admin/createProductSourceCategory/ProductSourceCategory";
import ProductBase from "./pages/admin/createProductBase/ProductBase";
import Sku from "./pages/admin/sku/Sku";
import ShowUsers from "./pages/admin/showUsers/ShowUsers";
import Rm from "./pages/rm/Rm";
import ShowProductBase from './pages/productBase/ProductBase';
import ShowProductSourceCategory from "./pages/productSourceCategory/ProductSourceCategory";
import Skus from "./pages/skus/Skus";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='login' element={<Login/>} />
        <Route path='linkpage' element={<LinkPage/>} />
        <Route path='unauthorized' element={<Unauthorized/>} />

        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth allowedRoles={[3001]}/>}>
            <Route path='/' element={<Home/>} />
            <Route path='create-user' element={<CreateUser/>} />
            <Route path='create-department' element={<CreateDepartment/>} />
            <Route path='create-role' element={<CreateRole/>} />
            <Route path='product-capacity-unit' element={<ProductCapacityUnit/>} />
            <Route path='product-variant' element={<ProductVariant/>} />
            <Route path='product-series' element={<ProductSeries/>} />
            <Route path='product-source-category' element={<ProductSourceCategory/>} />
            <Route path='product-base' element={<ProductBase/>} />
            <Route path='product-sku' element={<Sku/>} />
            <Route path='users' element={<ShowUsers/>} />
            <Route path='rms' element={<Rm/>} />
            <Route path='productBases' element={<ShowProductBase/>} />
            <Route path='productCategory' element={<ShowProductSourceCategory/>} />
            <Route path='sku' element={<Skus/>} />
          </Route>
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App
