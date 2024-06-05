// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useState } from "react";

interface AuthContextType {
    saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider(props: PropsWithChildren) {
    let [userData, setUserData] = useState(null);

    const saveUserData = () => {
        let encodedToken = localStorage.getItem('userToken');
        if (encodedToken) {
            let decodedToken = jwtDecode(encodedToken);
            setUserData(decodedToken);
            console.log(decodedToken);
        } else {
            // Handle the case where there's no token
            console.error("No token found");
        }
    };

    return (
        <AuthContext.Provider value={{ saveUserData, userData }}>
            {props.children}
        </AuthContext.Provider>
    );
}
