import { useState, useEffect, useContext } from 'react'
import "./UnitDropdown.css";

function UnitDropdown( {onSelect}) {
    const [units, setUnits] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:4000/units')
            .then(response => response.json())
            .then(data => {
                setUnits(data);
            })
            .catch(error => {
                console.error('Error fetching units for dropdown:', error);
            });
    }, []);

    return (
        <select onChange={(e) => onSelect(JSON.parse(e.target.value))}>
            <option value='' disabled selected> -- Select a unit -- </option>
            {units.map((unit) => (
                <option key={unit.id} value={JSON.stringify(unit)}>
                    {unit.name}
                </option>
            ))}
        </select>
    );
}

export default UnitDropdown;