import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import LoginLogoutMessage from '../LoginLogoutMessage/LoginLogoutMessage.jsx'
import "./Training.css";

function Training() {
    const [trainingData, setTrainingData] = useState({
        completed: [],
        overdue: [],
        almostDue: [],
        available: [],
    });
    const [loading, setLoading] = useState(true);
    const { userID } = useContext(UserContext);


    useEffect(() => {
        if (!userID) {
            setLoading(false);
            return;
        }

        const fetchTrainings = async () => {
            try {
                const response = await fetch(`http://localhost:8081/employees/${userID}/trainings`);
                if (!response.ok) throw new Error("Failed to fetch data");

                const trainings = await response.json();

                const today = new Date();
                const categorizedData = {
                    completed: [],
                    overdue: [],
                    almostDue: [],
                    available: [],
                };

                trainings.forEach(training => {
                    if (training.date_completed) {
                        categorizedData.completed.push(training.name);
                    } else {
                        const dueDate = new Date(training.due_date);
                        if (dueDate < today) {
                            categorizedData.overdue.push(training.name);
                        } else if ((dueDate - today) / (1000 * 60 * 60 * 24) <= 7) {
                            categorizedData.almostDue.push(training.name);
                        } else {
                            categorizedData.available.push(training.name);
                        }
                    }
                });

                setTrainingData(categorizedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainings();
    }, [userID]);

    if (loading) return <p className="loading">Loading trainings...</p>;

    return (
        <div className="training-container">
            <h1>Training</h1>

            <LoginLogoutMessage />

            {["overdue", "almostDue", "available", "completed"].map((category) => (
                <details key={category} className={category}>
                    <summary>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Trainings ({trainingData[category].length})
                    </summary>
                    <ul>
                        {trainingData[category].length > 0 ? (
                            trainingData[category].map((t, i) => (
                                <li key={i} className={`${category}-data`}>{t}</li>
                            ))
                        ) : (
                            <li>No {category} trainings.</li>
                        )}
                    </ul>
                </details>
            ))}
        </div>
    );
}

export default Training;

//     useEffect(() => {
//         // fetch("http://localhost:8081/Training")
//         //   .then((res) => res.json())
//         //   .then((data) => setTrainingData(data))
//         //   .catch((error) => console.error("Error fetching data:", error));

//     //start of mock data
//         const IDtest = 'user5678';
//         const mockResponse = {
//             completed: ["Training 101", "Training 102"],
//             overdue: ["Training 103", "Training 104"],
//             almostDue: ["Training 105"],
//             available: ["Training 106", "Training 107"],
//         };
//         setTimeout(() => {
//             if (userID === IDtest) {
//                 setTrainingData(mockResponse);
//             }
//             setLoading(false);
//         }, 1000); // Simulated API delay
//     }, [userID]);
//     //end of mock data

//     if (loading) {
//         return <p className="loading">Loading trainings...</p>;
//     }

//     return (
//         <div className="training-container">
//             <h1>Training</h1>

//             <LoginLogoutMessage />

//             <details className="overdue">
//                 <summary>Overdue Trainings ({trainingData.overdue.length})</summary>
//                 <ul>
//                     {trainingData.overdue.length > 0 ? (
//                         trainingData.overdue.map((t, i) => <li key={i} className="overdue-data">{t}</li>)) : (<li>You have no overdue trainings. Awesome!</li>)}
//                 </ul>
//             </details>

//             <details className="almost-due">
//                 <summary>Almost Due Trainings ({trainingData.almostDue.length})</summary>
//                 <ul>
//                     {trainingData.almostDue.length > 0 ? (
//                         trainingData.almostDue.map((t, i) => <li key={i} className="almost-data">{t}</li>)) : (<li>You have no upcoming trainings. Awesome!</li>)}
//                 </ul>
//             </details>

//             <details className="available">
//                 <summary>Available Trainings ({trainingData.available.length})</summary>
//                 <ul>
//                     {trainingData.available.length > 0 ? (
//                         trainingData.available.map((t, i) => <li key={i} className="available-data">{t}</li>)) : (<li>You have no trainings available.</li>)}
//                 </ul>
//             </details>

//             <details className="completed">
//                 <summary>Completed Trainings ({trainingData.completed.length})</summary>
//                 <ul>
//                     {trainingData.completed.length > 0 ? (
//                         trainingData.completed.map((t, i) => <li key={i} className="completed-data">{t}</li>)) : (<li>You have not completed any trainings. Yikes!</li>)}
//                 </ul>
//             </details>
//         </div>
//     );
// }