import { useState, useEffect, useContext } from 'react'
import './Login.css'

import LoginLogoutMessage from '../LoginLogoutMessage/LoginLogoutMessage.jsx'
import { UserContext } from "../../context/UserContext.jsx";

function Login() {
    const { userID, setUserID } = useContext(UserContext);

    const enterKeySearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUserID(document.getElementById('user-id-input').value);
        }
    }

    return (
        <>
            {/* <h3>Sign In</h3> */}
            <LoginLogoutMessage />

            <form>
                <label>User ID: </label>
                <input id='user-id-input' type='text' onKeyDown={enterKeySearch}/>

                <input type='button' value='Sign In' onClick={() => {
                    setUserID(document.getElementById('user-id-input').value);
                }} />

                {/* When clicked, clears the user id cookie */}
                <input type='button' value='Sign Out' onClick={() => {
                    setUserID('');
                }} />
            </form>
        </>
    )
}

export default Login