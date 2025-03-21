import { useState, useContext } from "react";
import "./UnitDropdown.css";

function UnitDropdown() {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState('');

    useEffect(() => {
        fetch('TODO')
            .then(response => response.json())
            .then(data => {
                setUnits(data);
            })
            .catch(error => {
                console.error('Error fetching units for dropdown:', error);
            }
            )
    }, []);

    return (
        <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
            <option value='' disabled> -- Select a unit -- </option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default UnitDropdown;