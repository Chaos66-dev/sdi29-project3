import { useState, useEffect, useContext } from 'react'
import './Personnel.css'
import { useParams, Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext.jsx";

function Personnel() {
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
        fetch(`http://localhost:4000/trainings/employees`)
        fetch(`http://localhost:4000/employees/${userID}`)
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
    });

} else {
    setShowUserNotFoundMessage(true);
    setLoading(false);
}
}, [userID]);

const fetchTrainingData = (userID) => {
Promise.all([
    fetch(`http://localhost:4000/trainings`),
    fetch(`http://localhost:4000/trainings/employees`)
])
    .then(([trainingsRes, employeeTrainingsRes]) =>
        Promise.all([trainingsRes.json(), employeeTrainingsRes.json()])
    )
    .then(([trainings, employeeTrainings]) => {
        const userTrainings = employeeTrainings.filter(
            et => et.employee_id === parseInt(userID)
        );

        console.log(`User ${userID} completed ` + userTrainings.length);

        const currentDate = new Date("2025-03-24");
        const data_dates = {
            completed: [],
            overdue: [],
            almostDue: [],
            available: []
        };

        trainings.forEach(training => {
            const trainingInfo = {
                name: training.name,
                duration: training.duration,
                inPerson: training.in_person ? "Yes" : "No",
                dueDate: new Date(training.due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }).toUpperCase()
            };

            const completedTraining = userTrainings.find(
                ut => ut.training_id === training.id
            );

            if (completedTraining) {
                data_dates.completed.push({
                    ...trainingInfo,
                    completedDate: new Date(completedTraining.date_completed)
                        .toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }).toUpperCase()
                });
            }
            else {
                const dueDate = new Date(training.due_date);
                const daysUntilDue = (dueDate - currentDate) / (1000 * 60 * 60 * 24);

                if (daysUntilDue < 0) {
                    data_dates.overdue.push(trainingInfo);
                }
                else if (daysUntilDue <= 30) {
                    data_dates.almostDue.push(trainingInfo);
                }
                else {
                    data_dates.available.push(trainingInfo);
                }
            }
        });

        setTrainingData(data_dates);
        setLoading(false);
    })
    .catch(error => {
        console.error("Error fetching trainings:", error);
        setLoading(false);
    });
};

const incompleteTrainings = trainingData.overdue.length + trainingData.almostDue.length;
const totalTrainings = trainingData.completed.length + trainingData.overdue.length + trainingData.almostDue.length;
const completedTrainings = trainingData.completed.length;
const completedTrainingsPercentage = totalTrainings === 0 ? 0 : ((completedTrainings / totalTrainings) * 100).toFixed(2);

    const redToGreenProgressBar = (percentage) => {
        if (percentage < 50) {
            return "red";
        }
        else if (percentage < 80) {
            return "orange";
        }
        else {
            return "green";
        }
    }

    if (errorMessage) {
        return (
            <div>
                <h1>Error fetching personnel data</h1>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <p className = "loading">Loading...</p>
            </div>
        );
    }

    return (
        <>
        {/* <h1>Personnel Page</h1> */}

        {/* <Link to = {`/Units/${personnelData[0]?.unit_id}`}><button>My Unit</button></Link> */}
        {personnelData.map((employee) => (
            <div key={employee.id}>
            <h1 className = "name">Hi {employee.name}!</h1>
            <p className = "rank">Rank: {employee.rank}</p>
            <p className = "age">Age: {employee.age}</p>
            <p className = "gender">Gender: {employee.sex}</p>
        </div>
    ))}
{showUserNotFoundMessage && <h3 className="user-not-found">User Not Found!<br />Please Sign In With a Valid User ID</h3>}
{showUserNotFoundMessage && <p>Sign in at the <Link to = {'/'}><strong>Home Screen</strong></Link></p>}

                {!showUserNotFoundMessage && <strong className = "training-progress">Training Progress: {completedTrainingsPercentage}%</strong>}
                <div className = "training-progress-bar">
                {!showUserNotFoundMessage &&<div className = "progress" style = {{width: `${completedTrainingsPercentage}%`, backgroundColor: redToGreenProgressBar(completedTrainingsPercentage) }}></div>}
                        </div>
{!showUserNotFoundMessage && completedTrainings === totalTrainings && <h3>All Training Complete!</h3>}
{!showUserNotFoundMessage && completedTrainings < totalTrainings && <h3>Training Incomplete! {incompleteTrainings} Tasks left</h3>}
{!showUserNotFoundMessage && completedTrainings < totalTrainings && <p>Head to <Link to = {'/Training'}><strong>Training</strong></Link> to Complete</p>}

{userID == 5 && <Link to = {'/AllPersonnel'}><button>All Personnel</button></Link>}
        </>
    );
}

export default Personnel;