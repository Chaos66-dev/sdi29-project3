import { useState, useEffect, useContext } from 'react'
import './AllPersonnel.css'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext.jsx";


function AllPersonnel() {
  const { userID, setUserID } = useContext(UserContext);
  const [personnelData, setPersonnelData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showUserNotFoundMessage, setShowUserNotFoundMessage] = useState(false);
  const [trainingData, setTrainingData] = useState({
    completed: [],
    overdue: [],
    almostDue: [],
    available: []
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(userID != null && userID !== '')  {
        fetch(`http://localhost:4000/employees`)
        .then((res) => {
            console.log(res.status)
            return res.json()
        })
        .then((data) => {
            // console.log(data)
         setPersonnelData(data)
        const validId = data.some(employee => employee.id == userID);
        console.log(validId);

        if (validId) {
            setShowUserNotFoundMessage(false);
            fetchTrainingData(userID);
        } else {
            console.log('User Not Found!');
            setShowUserNotFoundMessage(true);
            setLoading(false);
        }
    })
    .catch((error) => {
    console.error('Error fetching data:', error);
    setErrorMessage(true)
    setLoading(false);
    });

} else {
    setShowUserNotFoundMessage(true);
    setLoading(false);
}
}, [userID]);

// if (errorMessage) {
//   return (
//       <div>
//           <h1>Error fetching personnel data</h1>
//       </div>
//   );
// }

if (loading) {
  return (
      <div>
          <h2 className = "loading">Loading...</h2>
      </div>
  );
}9

return (
  <>
  <div className = "all-personnel">
  <h1>All Personnel</h1>
  {personnelData.map((employee) => (
            <div key={employee.id} className = "personnel-item">
            <p className = "name">Name: {employee.name}</p>
            <p className = "rank">Rank: {employee.rank}</p>
            <p className = "age">Age: {employee.age}</p>
            <p className = "gender">Gender: {employee.sex}</p>
            <p className = "unit">Unit: <Link to = {`/Units/${employee.unit_id}`}>{employee.unit_id}</Link></p>
        </div>
    ))}
    </div>
  </>
  );
}

export default AllPersonnel;