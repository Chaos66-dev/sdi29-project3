import { createContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookies.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userID, setUserID] = useState(getCookie('USER_ID') || '');

    useEffect(() => {
        setCookie('USER_ID', userID, 30);
    }, [userID]);

    return (
        <UserContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserContext.Provider>
    );
}