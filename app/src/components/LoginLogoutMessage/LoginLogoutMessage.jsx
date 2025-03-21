import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext.jsx";
import './LoginLogoutMessage.css';

function LoginLogoutMessage() {
    const { userID } = useContext(UserContext);

    return (
        <>
            {(userID == '') ? (
                <p>
                    <i>You are currently signed out.</i>
                </p>
            ) : (
                <p>
                    <i>You are currently signed in as <strong>{userID}</strong></i>.
                </p>
            )}
        </>
    )
}

export default LoginLogoutMessage