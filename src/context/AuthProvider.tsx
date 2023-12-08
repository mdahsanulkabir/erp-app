import { createContext, useState,ReactNode } from "react";

interface AuthInterface {
    userEmail: string;
    password: string;
    accessToken: string;
    roles: number[];
}

interface AuthContextType {
    auth: AuthInterface;
    setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>
}

const initialAuthState: AuthInterface = {
    userEmail: "",
    password: "",
    accessToken: "",
    roles: [],
};

const AuthContext = createContext<AuthContextType>({
    auth: initialAuthState,
    setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthInterface>(initialAuthState);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext