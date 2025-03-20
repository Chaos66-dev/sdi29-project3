import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import "./Training.css";

function Training() {
    const [trainingData, setTrainingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        // fetch("http://localhost:8081/Training")
        //   .then((res) => res.json())
        //   .then((data) => setTrainingData(data))
        //   .catch((error) => console.error("Error fetching data:", error));

        //start of mock data
        const IDtest = 44;
        const mockResponse = {
            completed: ["Training 101", "Training 102"],
            overdue: ["Training 103", "Training 104"],
            almostDue: ["Training 105"],
            available: ["Training 106", "Training 107"],
        };
        setTimeout(() => {
            if (IDtest === userID) {
                setTrainingData(mockResponse);
            }
            setLoading(false);
        }, 1000); // Simulated API delay
    }, [userID]);
    //end of mock data

    if (loading) {
        return <p className="loading">Loading trainings...</p>;
    }

    return (
        <div className="training-container">
            <h1>Training</h1>

            <p>Currently logged in as {userID}</p>

            <details className="overdue">
                <summary>Overdue Trainings ({trainingData.overdue.length})</summary>
                <ul>
                    {trainingData.overdue.length > 0 ? (
                        trainingData.overdue.map((t, i) => <li key={i} className="overdue-data">{t}</li>)) : (<li>You have no overdue trainings. Awesome!</li>)}
                </ul>
            </details>

            <details className="almost-due">
                <summary>Almost Due Trainings ({trainingData.almostDue.length})</summary>
                <ul>
                    {trainingData.almostDue.length > 0 ? (
                        trainingData.almostDue.map((t, i) => <li key={i} className="almost-data">{t}</li>)) : (<li>You have no upcoming trainings. Awesome!</li>)}
                </ul>
            </details>

            <details className="available">
                <summary>Available Trainings ({trainingData.available.length})</summary>
                <ul>
                    {trainingData.available.length > 0 ? (
                        trainingData.available.map((t, i) => <li key={i} className="available-data">{t}</li>)) : (<li>You have no trainings available.</li>)}
                </ul>
            </details>

            <details className="completed">
                <summary>Completed Trainings ({trainingData.completed.length})</summary>
                <ul>
                    {trainingData.completed.length > 0 ? (
                        trainingData.completed.map((t, i) => <li key={i} className="completed-data">{t}</li>)) : (<li>You have not completed any trainings. Yikes!</li>)}
                </ul>
            </details>
        </div>
    );
}

export default Training;