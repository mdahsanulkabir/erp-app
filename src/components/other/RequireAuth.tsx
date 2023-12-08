import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface RoleInterface {
    allowedRoles: number[]
}

const RequireAuth = ({ allowedRoles }:RoleInterface) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) 
        ? <Outlet/>
        : auth?.userEmail
            ? <Navigate to='/unauthorized' state={{from: location}} replace/>
            : <Navigate to='/login' state={{from: location}} replace />
    )
}

export default RequireAuth;