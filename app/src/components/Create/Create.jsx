import { useState, useEffect, useContext } from 'react'
import './Create.css'

import UnitDropdown from '../UnitDropdown/UnitDropdown.jsx';
import PersonnelDropdown from '../PersonnelDropdown/PersonnelDropdown.jsx';

// TODO: Implement tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// This page is used for adding/renmoving units and personnel to the database

// Going to add a dropdown that selects to render units or personnel
// When units is selected, it will render a form to add, update, or remove units
// When personnel is selected, it will render a form to add, update, or remove personnel
// uses a fetched drop-down list of units and personnel


function Create() {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const [currentTab, setCurrentTab] = useState('UNITS');

    return (
        <>


            <h1>Create</h1>
            <p>This page is used for creating, updating, and deleting units and personnel.</p>

            <select onChange={(e) => {
                setCurrentTab(e.target.value);
            }}>
                <option value='UNITS'> -- Create, Update, and Delete Units -- </option>
                <option value='PERSONNEL'> -- Create, Update, and Delete Personnel -- </option>
            </select>

            {/* for testing: instead of this, use to fetch and autofill info */}
            {/* <p>Selected Unit: {selectedUnit?.name || 'none'}</p>
            <p>Selected Employee: {selectedEmployee?.name || 'none'}</p> */}

            {(currentTab === 'UNITS') ? (
                <div>
                    <h2>Units</h2>
                    <form>
                        <h4>Add Unit</h4>
                        <input type="text" placeholder="Unit ID" id='unit-id-input' required />
                        <input type="text" placeholder="Unit Name" id='unit-name-input' />
                        <input type='button' value='Add Unit' onClick={() => {
                            // POST

                        }} />
                    </form>
                    <form>
                        <h4>Update Unit</h4>
                        <UnitDropdown onSelect={(value) => {
                            setSelectedUnit(value);

                            // PUT

                        }} />
                        <input type="text" placeholder="Unit ID" id='unit-id-input' />
                        <input type="text" placeholder="Unit Name" id='unit-name-input' />
                        <input type='button' value='Update Unit' onClick={() => {

                        }} />
                    </form>
                    <form>
                        <h4>Remove Unit</h4>
                        <UnitDropdown onSelect={(value) => {
                            setSelectedUnit(value);
                        }} />
                        <input type='button' value='Remove Unit' onClick={() => {
                            // DELETE
                        }} />
                    </form>
                </div>
            ): null}

            {(currentTab === 'PERSONNEL') ? (
                <div>
                    <h2>Personnel</h2>
                    <form>
                        <h4>Add Employee</h4>
                        <input type="text" placeholder="Employee ID" id='employee-id-input' />
                        <input type="text" placeholder="Unit ID" id='unit-id-input' />
                        <input type="text" placeholder="Employee Name" id='employee-name-input' />
                        <input type="text" placeholder="Employee Rank" id='employee-rank-input' />
                        <input type="text" placeholder="Employee Age" id='employee-age-input' />
                        <input type="text" placeholder="Employee Sex" id='employee-sex-input' />
                        <input type='button' value='Add Employee' onClick={() => {
                            // POST

                        }} />
                    </form>
                    <form>
                        <h4>Update Employee Records</h4>
                        <PersonnelDropdown onSelect={(value) => {
                            setSelectedEmployee(value);

                            // PUT

                        }} />
                        <input type="text" placeholder="Employee ID" id='employee-id-input' />
                        <input type="text" placeholder="Unit ID" id='unit-id-input' />
                        <input type="text" placeholder="Employee Name" id='employee-name-input' />
                        <input type="text" placeholder="Employee Rank" id='employee-rank-input' />
                        <input type="text" placeholder="Employee Age" id='employee-age-input' />
                        <input type="text" placeholder="Employee Sex" id='employee-sex-input' />
                        <input type='button' value='Update Employee' onClick={() => {

                        }} />
                    </form>
                    <form>

                        <h4>Remove Employee</h4>
                        <PersonnelDropdown onSelect={(value) => {
                            setSelectedEmployee(value);
                        }} />
                        <input type='button' value='Remove Employee' onClick={() => {
                            // DELETE
                        }} />
                    </form>
                </div>
            ) : null}
        </>
    )
}

export default Create