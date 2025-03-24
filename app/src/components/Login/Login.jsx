import { useState, useEffect, useContext } from 'react'
import './Login.css'
import LoginLogoutMessage from '../LoginLogoutMessage/LoginLogoutMessage.jsx'
import { UserContext } from "../../context/UserContext.jsx";

function Login() {
    const { userID, setUserID } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(false);
    const [personnelData, setPersonnelData] = useState([]);
    const [showUserNotFoundMessage, setShowUserNotFoundMessage] = useState(false);


    useEffect(() => {
        if(userID != null) {
            fetch(`http://localhost:4000/employees/${userID}`)
            .then((res) => {
                console.log(res.status)
                console.log(userID)
                return res.json();
            })
            .then((data) => { setPersonnelData(data);

                // if userID exists in the data
                const validId = data.some(employee => employee.id == userID);
                console.log(validId);

                if (validId || userID == '') {
                    // console.log('User Exists!');
                    setShowUserNotFoundMessage(false);
                }

                else {
                    console.log('User Not Found!');
                    setShowUserNotFoundMessage(true);
                }
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            setErrorMessage(true)
            // if (userID === id.length + 1) {
            //         console.log('User Not Found');
            //         setErrorMessage(true)
            // }
            });

        } else {
            setErrorMessage(true);
        }
    }, [userID]);

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
            {showUserNotFoundMessage && <p className="user-not-found">User ID not found</p>}
        </>
    )
}

export default Login