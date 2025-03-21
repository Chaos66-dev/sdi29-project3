import { useState, useEffect, useContext } from 'react'
import './Personnel.css'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext.jsx";

function Personnel() {
    const { userID, setUserID } = useContext(UserContext);
    const [personnelData, setPersonnelData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
    if(userID != null) {
        fetch(`http://localhost:4000/employees/${userID}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('User Not Found');
        }
           return res.json()
    })
        .then((data) => setPersonnelData(data))
          .catch((error) => {
            console.error('Error fetching data:', error);
            setErrorMessage(true)
        });

    } else {
        setErrorMessage(true);
    }
}, [userID]);

    if (errorMessage) {
        return (
            <div>
                <h1>Error fetching personnel data</h1>
                <Link to = {'/'}><button>Back to Home</button></Link>
            </div>
        );
    }

    if (!personnelData.length === 0) {
        return
        <h2 className = "loading">Loading...</h2>
    };

    return (
        <>
        <Link to = {`/Units/${personnelData[0]?.unit_id}`}><button>My Unit</button></Link>
            <h1>Personnel Page</h1>
        {personnelData.map((employee) => (
        <div key={employee.id}>
            <p className = "name">Name: {employee.name}</p>
            <p className = "rank">Rank: {employee.rank}</p>
            <p className = "age">Age: {employee.age}</p>
            <p className = "gender">Gender: {employee.sex}</p>
        </div>
        ))}
            <h2>Task List</h2>
        </>
    );
}

export default Personnel;