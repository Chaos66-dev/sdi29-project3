import { useState, useEffect, useContext } from 'react'
import './Personnel.css'
import { Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext.jsx";

function Personnel() {
    const { userID, setUserID } = useContext(UserContext);

    const [personnelData, setPersonnelData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
    if(userID != null) {
        fetch(`http://localhost:8081/personnel?userID=${userID}`)
          .then((res) => res.json())
          .then((data) => setPersonnelData(data))
          .catch((error) => {
            console.error('Error fetching data:', error);
            setErrorMessage(true)
        });
    } else {
        setErrorMessage(true);
    }
      }, []);

    if (errorMessage) {
        return (
            <div>
                <h1>Error fetching personnel data</h1>
                <Link to = {'/'}><button>Back to Home</button></Link>
            </div>
        );
    }

    if (!personnelData) {
        return (
        <h2 className = "loading">Loading...</h2>
    )};

      const {name, rank, age, gender} = personnelData;

    return (
        <>
        <Link to = {`/Unit/:${userID}`}><button>Unit</button></Link>
            <h1>Personnel Page</h1>
            <p className = "name">Name: {e.name}</p>
            <p className = "rank">Rank: {e.rank}</p>
            <p className = "age">Age: {e.age}</p>
            <p className = "gender">Gender: {e.gender}</p>
            <h2>Task List</h2>

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
    );
}

export default Personnel;