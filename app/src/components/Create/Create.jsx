import { useState, useEffect, useContext } from 'react'
import './Create.css'

import UnitDropdown from '../UnitDropdown/UnitDropdown.jsx';
import PersonnelDropdown from '../PersonnelDropdown/PersonnelDropdown.jsx';

// This page is used for adding/renmoving units and personnel to the database

// unit data is as follows:
// id
// name

// personnel data is as follows:
// id
// unit_id
// name
// rank
// age
// sex

// uses a fetched drop-down list of units and personnel


function Create() {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    return (
        <>
            <h1>Create</h1>
            <p>This page is used for creating, updating, and deleting units and personnel.</p>

            {/* for testing: instead of this, use to fetch and autofill info */}
            <p>Selected Unit: {selectedUnit?.name || 'none'}</p>
            <p>Selected Employee: {selectedEmployee?.name || 'none'}</p>

            <h2>Units</h2>

            <form>
                <h2>Update Unit</h2>
                <UnitDropdown onSelect={(value) => {
                    setSelectedUnit(value);

                    document.getElementById('unit-id-input').setAttribute('value', selectedUnit.id);
                    document.getElementById('unit-name-input').setAttribute('value', selectedUnit.name);
                }} />
                <input type="text" placeholder="Unit ID" id='unit-id-input' />
                <input type="text" placeholder="Unit Name" id='unit-name-input' />
                <input type='button' value='Update' onClick={() => {

                }} />

                {/* <input type='button' value='Add Unit' onClick={() => {
                    //setUserID(document.getElementById('unit-id-input').value);
                }} />

                <input type='button' value='Remove Unit' onClick={() => {

                }} />
                <input type='button' value='Update Unit' onClick={() => {

                }} /> */}


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