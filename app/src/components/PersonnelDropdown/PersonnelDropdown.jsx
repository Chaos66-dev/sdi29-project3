import { useState, useEffect, useContext } from 'react'
import "./PersonnelDropdown.css";

function PersonnelDropdown( {onSelect}) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:4000/employees')
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                console.error('Error fetching employees for dropdown:', error);
            });
    }, []);

    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value='' disabled selected> -- Select an employee -- </option>
            {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                    {employee.name}
                </option>
            ))}
        </select>
    );
}

export default PersonnelDropdown;