import { useState, useEffect, useContext } from 'react'

import { UserContext } from "../../context/UserContext.jsx";

function LoginLogoutMessage() {
    const { userID } = useContext(UserContext);

    return (
        <>
            {/* Signed in/out message */}
            {userID == '' ? <p>You are currently signed out.</p> : <p>You are currently signed in as {userID}.</p>}
        </>
    )
}

export default LoginLogoutMessage