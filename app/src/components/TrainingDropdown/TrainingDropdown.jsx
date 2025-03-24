import { useState, useEffect } from 'react';

function TrainingDropdown({ onSelect }) {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {

        fetch('http://localhost:4000/trainings')
            .then(response => response.json())
            .then(data => {
                setTrainings(data);
            })
            .catch(error => {
                console.error('Error fetching trainings:', error);
            });
    }, [trainings]);

    return (
        <select onChange={(e) => {
            const selectedTraining = trainings.find(training => training.id === parseInt(e.target.value));
            onSelect(selectedTraining || null);
        }}>
            <option value="">-- Select a Training Course --</option>
            {trainings.map(training => (
                <option key={training.id} value={training.id}>
                    {training.name} (ID: {training.id})
                </option>
            ))}
        </select>
    );
}

export default TrainingDropdown;