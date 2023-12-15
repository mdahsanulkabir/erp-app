import { createContext, useState,ReactNode } from "react";

interface AuthInterface {
    userEmail: string;
    userName: string;
    password: string;
    accessToken: string;
    roles: number[];
}

interface AuthContextType {
    auth: AuthInterface;
    setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>
}

export const initialAuthState: AuthInterface = {
    userEmail: "",
    userName: "",
    password: "",
    accessToken: "",
    roles: [],
};

const AuthContext = createContext<AuthContextType>({
    auth: initialAuthState,
    setAuth: () => {},
    persist: false,
    setPersist: () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthInterface>(initialAuthState);
    const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem("persist") ?? "false") || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;