import axios from "../config/axios";
import useAuth from "./useAuth";
import { initialAuthState } from "../context/AuthProvider";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth(initialAuthState);
        try {
            await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout