import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import LoginLogoutMessage from "../LoginLogoutMessage/LoginLogoutMessage.jsx";
import "./Training.css";

function Training() {
    const [trainingData, setTrainingData] = useState({
        completed: [],
        overdue: [],
        almostDue: [],
        available: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userID } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);

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
    }, [userID]);

    if (loading) {
        return <p className="loading">Loading trainings...</p>;
    }

    return (
        <div className="training-container">
            <h1>Training</h1>

            <LoginLogoutMessage />

            <details className="overdue">
                <summary style={{ color: trainingData.overdue.length > 0 ? "red" : "inherit" }}> Overdue Trainings ({trainingData.overdue.length}) </summary>
                <ul>
                    {trainingData.overdue.length > 0 ? (
                        trainingData.overdue.map((t, i) => (
                            <li key={i} className="overdue-data">
                                <br />
                                <strong>{t.name}</strong>
                                <br />
                                {(() => {
                                    const [hours, minutes] = t.duration.split(":").map(Number);
                                    return hours > 0 ? `Hours: ${hours}` : `Minutes: ${minutes}`;})()}
                                <br /> TDY: {t.inPerson}
                                <br /> Due Date: {t.dueDate}
                                <br />
                            </li>
                        )) ) : ( <li>You have no overdue trainings. Awesome!</li>
                    )}
                </ul>
            </details>

            <details className="almost-due">
            <summary style={{ color: trainingData.almostDue.length > 0 ? "orange" : "inherit" }} > Almost Due Trainings ({trainingData.almostDue.length})</summary>
                <ul>
                    {trainingData.almostDue.length > 0 ? (
                        trainingData.almostDue.map((t, i) => (
                            <li key={i} className="almost-data">
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
                        )) ) : (<li>You have no upcoming trainings. Awesome!</li>
                    )}
                </ul>
            </details>

            <details className="available">
                <summary>Available Trainings ({trainingData.available.length})</summary>
                <ul>
                    {trainingData.available.length > 0 ? (
                        trainingData.available.map((t, i) => (
                            <li key={i} className="available-data">
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
                        )) ) : (<li>You have no trainings available.</li>
                    )}
                </ul>
            </details>

            <details className="completed">
                <summary>Completed Trainings ({trainingData.completed.length})</summary>
                <ul>
                    {trainingData.completed.length > 0 ? (
                        trainingData.completed.map((t, i) => (
                            <li key={i} className="completed-data">
                                <br />
                                <strong>{t.name}</strong>
                                <br />
                                {(() => {
                                    const [hours, minutes] = t.duration.split(":").map(Number);
                                    return hours > 0 ? `Hours: ${hours}` : `Minutes: ${minutes}`;
                                })()}
                                <br /> TDY: {t.inPerson}
                                <br /> Completed: {t.completedDate}
                                <br />
                            </li>
                        )) ) : ( <li>You have not completed any trainings. Yikes!</li>
                    )}
                </ul>
            </details>
        </div>
    );
}

export default Training;