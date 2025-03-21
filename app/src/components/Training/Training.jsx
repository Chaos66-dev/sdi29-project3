import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import LoginLogoutMessage from "../LoginLogoutMessage/LoginLogoutMessage.jsx";
import "./Training.css";

function Training() {
    const [trainingData, setTrainingData] = useState({
        completed: [],
        overdue:   [],
        almostDue: [],
        available: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:4000/trainings`)
            .then(res => res.json())
            .then(trainings => {
                const data_dates = {
                    completed: [],
                    overdue: [],
                    almostDue: [],
                    available: trainings.map(t => ({
                        name: t.name,
                        duration: t.duration,
                        inPerson: t.in_person ? "Yes" : "No",
                        dueDate: new Date(t.due_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        }).toUpperCase()
                    }))
                };

                setTrainingData(data_dates);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching trainings:", error);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return <p className="loading">Loading trainings...</p>;
    }

    return (
        <div className="training-container">
            <h1>Training</h1>

            <LoginLogoutMessage />

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
                        trainingData.available.map((t, i) => <li key={i} className="available-data">
                        <br />
                        <strong>{t.name}</strong>
                        <br />
                        {(() => {
                            const [hours, minutes] = t.duration.split(":").map(Number);
                            return hours > 0 ? `Hours: ${hours}` : `Minutes: ${minutes}`;
                        })()}
                        <br /> TDY: {t.inPerson}
                        <br /> Due Date: {t.dueDate}
                        <br />
                    </li>
                )) : (<li>You have no trainings available.</li>)}
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