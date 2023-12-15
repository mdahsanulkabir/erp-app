import axios from "../config/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh',
        {
            withCredentials: true
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return {...prev,
                accessToken: response.data.accessToken,
                roles: response.data.roles,
                userName: response.data.userName,
                userEmail: response.data.userEmail
            }
        })
        return response.data.accessToken;
        console.log({auth})
    }

    return refresh;
}

export default useRefreshToken;