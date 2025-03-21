import { useState, useEffect, useContext } from 'react'
import './Create.css'

import UnitDropdown from '../UnitDropdown/UnitDropdown.jsx';
import PersonnelDropdown from '../PersonnelDropdown/PersonnelDropdown.jsx';

// This page is used for adding/renmoving units and personnel to the database

// uses a fetched drop-down list of units and personnel


function Create() {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    return (
        <>
            <h1>Create</h1>
            <p>This page is used for creating, updating, and deleting units and personnel.</p>

            {/* for testing */}
            <p>Selected Unit: {selectedUnit || 'none'}</p>
            <p>Selected Employee: {selectedEmployee || 'none'}</p>

            <h2>Units</h2>

            <form>
                <UnitDropdown onSelect={(value) => setSelectedUnit(value)} />


                <input type="text" placeholder="Unit ID" id='unit-id-input' />

                <input type='button' value='Add Unit' onClick={() => {
                    //setUserID(document.getElementById('unit-id-input').value);
                }} />

                <input type='button' value='Remove Unit' onClick={() => {

                }} />
                <input type='button' value='Update Unit' onClick={() => {

                }} />


                <br/>
            </form>

            <h2>Personnel</h2>
            <PersonnelDropdown onSelect={(value) => setSelectedEmployee(value)} />


            {/* // button options are add unit, remove unit, update unit

            // button options are add personnel, remove personnel, update personnel

            // Select box of units in the database
            // Clicking on one populaates the fields */}




        </>
    )
}

export default Create