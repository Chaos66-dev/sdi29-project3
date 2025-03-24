import { createContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookies.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userID, setUserID] = useState(getCookie('USER_ID') || '');
    const [unitID, setUnitID] = useState(getCookie('UNIT_ID') || '');

    useEffect(() => {
        if (userID) {
            fetch(`http://localhost:4000/employees/${userID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched employee data:", data);
                    const employee = Array.isArray(data) ? data[0] : data;

                    setUnitID(employee.unit_id);
                    setCookie('UNIT_ID', employee.unit_id, 30);
                })
                .catch(() => setUnitID(''));
        } else {
            setUnitID('');
        }

        setCookie('USER_ID', userID, 30);
    }, [userID]);

    return (
        <UserContext.Provider value={{ userID, setUserID, unitID }}>
            {children}
        </UserContext.Provider>
    );
}