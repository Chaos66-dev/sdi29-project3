import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext.jsx";
import './LoginLogoutMessage.css';



function LoginLogoutMessage() {
    const { userID } = useContext(UserContext);

    const { invalidUser } = useContext(UserContext);

    return (
        <>
            {(userID == '' || invalidUser) ? (
                <>
                    {(invalidUser) ? (
                        <p>
                            <i>Invalid user</i>
                        </p>
                    ) : (
                        <p>
                            <i>You are currently signed out.</i>
                        </p>
                    )}

                </>
            ) : (
                <p>
                    <i>You are currently signed in as <strong>{userID}</strong></i>.
                </p>
            )}
        </>
    )
}

export default LoginLogoutMessage