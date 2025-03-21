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
        fetch(`http://localhost:4000/employees?userID=${userID}`)
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
        {/* <Link to = {`/Unit/:${userID}`}><button>Unit</button></Link> */}
            <h1>Personnel Page</h1>
        {personnelData.map((employees) => (
        <div key={employees.id}>
            <p className = "name">Name: {employees.name}</p>
            <p className = "rank">Rank: {employees.rank}</p>
            <p className = "age">Age: {employees.age}</p>
            <p className = "gender">Gender: {employees.sex}</p>
        </div>
        ))}
            <h2>Task List</h2>
        </>
    );
}

export default Personnel;