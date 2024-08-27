import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthContextType {
    saveUserData: () => void;
    userData: any; // Use `any` for userData
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider(props: PropsWithChildren) {
    const [userData, setUserData] = useState<any>(null); // Use `any` for userData

    const saveUserData = () => {
        let encodedToken = localStorage.getItem('userToken');
        if (encodedToken) {
            let decodedToken = jwtDecode<any>(encodedToken); // Use `any` for decodedToken
            setUserData(decodedToken);
            console.log(decodedToken);
        } else {
            console.error("No token found");
        }
    };

    return (
        <AuthContext.Provider value={{ saveUserData, userData }}>
            {props.children}
        </AuthContext.Provider>
    );
}
