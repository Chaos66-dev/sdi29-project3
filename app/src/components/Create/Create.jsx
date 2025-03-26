import { useState, useEffect, useContext } from 'react'
import './Create.css'

import UnitDropdown from '../UnitDropdown/UnitDropdown.jsx';
import PersonnelDropdown from '../PersonnelDropdown/PersonnelDropdown.jsx';
import TrainingDropdown from '../TrainingDropdown/TrainingDropdown.jsx';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

// This page is used for adding/renmoving units and personnel to the database

// Going to add a dropdown that selects to render units or personnel
// When units is selected, it will render a form to add, update, or remove units
// When personnel is selected, it will render a form to add, update, or remove personnel
// uses a fetched drop-down list of units and personnel


function Create() {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedTraining, setSelectedTraining] = useState('');

    const [tabValue, setTabValue] = useState('1');

    // TRAININGS
    // Add Training
    const addTraining = (trainingName, trainingDuration, trainingTDY, trainingDue) => {
        console.log('Sending to server:', {
            name: trainingName,
            duration: trainingDuration,
            in_person: trainingTDY,
            due_date: trainingDue,
        });

        fetch('http://localhost:4000/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: String(trainingName || '').trim(),
                duration: String(trainingDuration || '').trim(),
                in_person: Boolean(trainingTDY),
                due_date: String(trainingDue || '').trim(),
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful unit POST:', data);
                alert(`Training Added!`);
            })
            .catch((error) => {
                console.error('Error unit POST:', error);
            });
    };

    //Edit Trainings
    const editTraining = (trainingID, trainingName, trainingDuration, trainingTDY, trainingDue) => {
        console.log('Sending to server:', {
            id: trainingID,
            name: trainingName,
            duration: trainingDuration,
            in_person: trainingTDY,
            due_date: trainingDue,
        });
        fetch('http://localhost:4000/trainings', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Number(trainingID),
                name: String(trainingName || '').trim(),
                duration: Number(trainingDuration),
                in_person: Boolean(trainingTDY),
                due_date: trainingDue,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful unit PATCH:', data);
                alert(`Training Updated!`);// thank you!!!  :)
            })
            .catch((error) => {
                console.error('Error unit PATCH:', error);
            });
    };

    // Delete Training
    const deleteTraining = () => {
    fetch(`http://localhost:4000/trainings/${selectedTraining?.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Successful training DELETE:', data);
            setSelectedTraining(''); // Clear the selection after deletion
            alert(`Training Removed!`);
        })
        .catch((error) => {
            console.error('Error training DELETE:', error);
        });
    };

    // Add Personnel Training
    const addPersonnelTraining = (employeeId, trainingId, dateCompleted) => {
        console.log('Sending to server:', {
            employee_id: employeeId,
            training_id: trainingId,
            date_completed: dateCompleted,
        });

        fetch('http://localhost:4000/employees/trainings/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee_id: Number(employeeId),
                training_id: Number(trainingId),
                date_completed: dateCompleted,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful personnel training POST:', data);
                alert(`Training Added to Employee!`);
            })
            .catch((error) => {
                console.error('Error personnel training POST:', error);
            });
    };

    // Edit Personnel Training
    const editPersonnelTraining = (recordId, employeeId, trainingId, dateCompleted) => {
        console.log('Sending to server:', {
            id: recordId,
            employee_id: employeeId,
            training_id: trainingId,
            date_completed: dateCompleted,
        });

        fetch('http://localhost:4000/employees/trainings/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Number(recordId),
                employee_id: Number(employeeId),
                training_id: Number(trainingId),
                date_completed: dateCompleted,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful personnel training PATCH:', data);
                alert(`Training Updated for Employee!`);
            })
            .catch((error) => {
                console.error('Error personnel training PATCH:', error);
            });
    };

    // Delete Personnel Training
    const deletePersonnelTraining = (recordId) => {
        console.log('Sending to server:', {
            id: recordId,
        });

        fetch('http://localhost:4000/employees/trainings/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Number(recordId),
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful personnel training DELETE:', data);
                setSelectedEmployee('');
                setSelectedTraining('');
                alert(`Training Removed from Employee!`);
            })
            .catch((error) => {
                console.error('Error personnel training DELETE:', error);
            });
    };

    // UNITS
    // Add Unit
    const addUnit = (unitName) => {
        fetch('http://localhost:4000/units', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: unitName
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful unit POST:', data);
                alert(`Unit Added!`);
            })
            .catch((error) => {
                console.error('Error unit POST:', error);
            });
    }

    // Update Unit
    const updateUnit = (newUnitName) => {
        fetch(`http://localhost:4000/units/${selectedUnit?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newUnitName
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful unit PATCH:', data);
                alert(`Unit Updated!`);
            })
            .catch((error) => {
                console.error('Error unit PATCH:', error);
            });
    }

    // Delete Unit
    const deleteUnit = () => {
        fetch(`http://localhost:4000/units/${selectedUnit?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful unit DELETE:', data);
                alert(`Unit Removed!`);
            })
            .catch((error) => {
                console.error('Error unit DELETE:', error);
            });
    }

    // PERSONNEL
    // Add Employee
    const addEmployee = (unitID, employeeName, employeeRank, employeeAge, employeeSex) => {
        fetch('http://localhost:4000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                unit_id: parseInt(unitID),
                name: employeeName,
                rank: employeeRank,
                age: parseInt(employeeAge),
                sex: employeeSex
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful employee POST:', data);
                // const newEmployeeId = data.length - 1;
                // alert(`Employee Added! Your Login ID is ${newEmployeeId}`);
                alert(`Employee Added!`);
            })
            .catch((error) => {
                console.error('Error employee POST:', error);
            });
    }

    // Update Employee
    const updateEmployee = (unitID, employeeName, employeeRank, employeeAge, employeeSex) => {
        fetch(`http://localhost:4000/employees/${selectedEmployee?.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                unit_id: parseInt(unitID),
                name: employeeName,
                rank: employeeRank,
                age: parseInt(employeeAge),
                sex: employeeSex
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful employee PATCH:', data);
                alert(`Employee Updated!`);
            })
            .catch((error) => {
                console.error('Error employee PATCH:', error);
            });
    }

    // Delete Employee
    const deleteEmployee = () => {
        fetch(`http://localhost:4000/employees/${selectedEmployee?.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successful employee DELETE:', data);
                alert(`Employee Removed`);
            })
            .catch((error) => {
                console.error('Error employee DELETE:', error);
            });
    }

    // change tabs
    const changeTab = (event, newTabValue) => {
        setTabValue(newTabValue);
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={changeTab} aria-label="create tabs">
                            <Tab label="Units" value="1" sx={{
                                '&:focus': {
                                    outline: 'none'
                                }
                            }} />
                            <Tab label="Employees" value="2" sx={{
                                '&:focus': {
                                    outline: 'none'
                                }
                            }} />
                            <Tab label="Trainings" value="3" sx={{
                                '&:focus': {
                                    outline: 'none'
                                }
                            }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div>
                            <form>
                                <h4>Add Unit</h4>
                                <input type="text" placeholder="Unit Name" id='add-unit-name-input' />
                                <input type='button' value='Add Unit' onClick={() => {
                                    // POST
                                    addUnit(document.getElementById('add-unit-name-input').value);
                                }} />
                            </form>
                            <form>
                                <h4>Update Unit</h4>
                                <UnitDropdown onSelect={(value) => {
                                    setSelectedUnit(value);
                                }} />
                                <input type="text" placeholder="New Unit Name" id='update-unit-name-input' />
                                <input type='button' value='Update Unit' onClick={() => {
                                    // PUT
                                    updateUnit(document.getElementById('update-unit-name-input').value);
                                }} />
                            </form>
                            <form>
                                <h4>Remove Unit</h4>
                                <UnitDropdown onSelect={(value) => {
                                    setSelectedUnit(value);
                                }} />
                                <input type='button' value='Remove Unit' onClick={() => {
                                    // DELETE
                                    deleteUnit();
                                }} />
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <div>
                            <form>
                                <h4>Add Employee</h4>
                                <input type="number" placeholder="Unit ID" id='add-unit-id-input' />
                                <input type="text" placeholder="Employee Name" id='add-employee-name-input' />
                                <input type="text" placeholder="Employee Rank" id='add-employee-rank-input' />
                                <input type="number" placeholder="Employee Age" id='add-employee-age-input' />
                                <input type="text" placeholder="Employee Sex" id='add-employee-sex-input' />
                                <input type='button' value='Add Employee' onClick={() => {
                                    // POST
                                    addEmployee(document.getElementById('add-unit-id-input').value, document.getElementById('add-employee-name-input').value, document.getElementById('add-employee-rank-input').value, document.getElementById('add-employee-age-input').value, document.getElementById('add-employee-sex-input').value);
                                }} />
                            </form>
                            <form>
                                <h4>Update Employee Records</h4>
                                <PersonnelDropdown onSelect={(value) => {
                                    setSelectedEmployee(value);
                                    // also autofill input value
                                    document.getElementById('update-unit-id-input').value = value.unit_id;
                                    document.getElementById('update-employee-name-input').value = value.name;
                                    document.getElementById('update-employee-rank-input').value = value.rank;
                                    document.getElementById('update-employee-age-input').value = value.age;
                                    document.getElementById('update-employee-sex-input').value = value.sex;

                                }} />
                                <input type="text" placeholder="Unit ID" id='update-unit-id-input' />
                                <input type="text" placeholder="Employee Name" id='update-employee-name-input' />
                                <input type="text" placeholder="Employee Rank" id='update-employee-rank-input' />
                                <input type="text" placeholder="Employee Age" id='update-employee-age-input' />
                                <input type="text" placeholder="Employee Sex" id='update-employee-sex-input' />
                                <input type='button' value='Update Employee' onClick={() => {
                                    // PATCH
                                    updateEmployee(document.getElementById('update-unit-id-input').value, document.getElementById('update-employee-name-input').value, document.getElementById('update-employee-rank-input').value, document.getElementById('update-employee-age-input').value, document.getElementById('update-employee-sex-input').value);
                                }} />
                            </form>
                            <form>
                                <h4>Remove Employee</h4>
                                <PersonnelDropdown onSelect={(value) => {
                                    setSelectedEmployee(value);
                                }} />
                                <input type='button' value='Remove Employee' onClick={() => {
                                    // DELETE
                                    deleteEmployee();
                                }} />
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const name = document.getElementById('add-training-name-input').value;
                                const durationStr = document.getElementById('add-training-duration-input').value;
                                const inPerson = document.getElementById('add-training-TDY-input').value;
                                const dueDate = new Date(document.getElementById('add-training-due-input').value).toISOString();

                                let duration;
                                if (/^\d{2,3}:\d{2}:\d{2}$/.test(durationStr)) {
                                    const [days, hours, minutes] = durationStr.split(':').map(Number);
                                    duration = (days * 24 * 60) + (hours * 60) + minutes;
                                } else {
                                    console.error('Invalid duration format. Use DD:HH:MM.');
                                    return;
                                }

                                addTraining(name, duration, inPerson, dueDate);
                            }}>
                                <h3>Add Training</h3>
                                <input type="text" placeholder="Name" id='add-training-name-input' required />
                                <input type="text" placeholder="Duration (ex: 00:00:00)" id='add-training-duration-input' pattern="\d{2,3}:\d{2}:\d{2}" title="Format: DD:HH:MM or DDD:HH:MM" required />
                                <select id='add-training-TDY-input'>
                                    <option value="" disabled selected>TDY</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <input type="date" id='add-training-due-input' required />
                                <input type="submit" value="Add Training" />
                            </form>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const id = selectedTraining?.id;
                                const name = document.getElementById('edit-training-name-input').value;
                                const durationStr = document.getElementById('edit-training-duration-input').value;
                                const inPerson = document.getElementById('edit-training-TDY-input').value === "Yes";
                                const dueDate = new Date(document.getElementById('edit-training-due-input').value).toISOString();

                                let duration;
                                if (/^\d{2,3}:\d{2}:\d{2}$/.test(durationStr)) {
                                    const [days, hours, minutes] = durationStr.split(':').map(Number);
                                    duration = (days * 24 * 60) + (hours * 60) + minutes;
                                } else {
                                    console.error('Invalid duration format. Use DD:HH:MM.');
                                    return;
                                }

                                editTraining(id, name, duration, inPerson, dueDate);
                            }}>
                                <h3>Edit Training</h3>
                                <TrainingDropdown onSelect={(value) => {
                                    setSelectedTraining(value);
                                    if (value) {
                                        document.getElementById('edit-training-name-input').value = value.name;
                                        const totalMinutes = value.duration;
                                        const days = Math.floor(totalMinutes / (24 * 60));
                                        const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
                                        const minutes = totalMinutes % 60;
                                        const durationStr = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                                        document.getElementById('edit-training-duration-input').value = durationStr;
                                        document.getElementById('edit-training-TDY-input').value = value.in_person ? "Yes" : "No";
                                        document.getElementById('edit-training-due-input').value = new Date(value.due_date).toISOString().split('T')[0];
                                    }
                                }} />
                                <input type="text" placeholder="Name" id='edit-training-name-input' required />
                                <input type="text" placeholder="Duration (ex: 00:00:00)" id='edit-training-duration-input' pattern="\d{2,3}:\d{2}:\d{2}" title="Format: DD:HH:MM or DDD:HH:MM" required />
                                <select id='edit-training-TDY-input'>
                                    <option value="" disabled selected>TDY</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                <input type="date" id='edit-training-due-input' required />
                                <input type="submit" value="Edit Training" />
                                <h3>Remove Training</h3>
                                <TrainingDropdown onSelect={(value) => {
                                    setSelectedTraining(value);
                                }} />
                                <input type='button' value='Remove Training' onClick={() => {
                                    deleteTraining();
                                }} />
                            </form>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const employeeId = selectedEmployee?.id;
                                const trainingId = selectedTraining?.id;
                                const dateCompleted = document.getElementById('add-personnel-training-date-input').value;

                                if (!employeeId || !trainingId || !dateCompleted) {
                                    console.error('Error: Employee, Training, and Date Completed are required');
                                    return;
                                }

                                addPersonnelTraining(employeeId, trainingId, dateCompleted);
                            }}>
                                <h3>Add Personnel Training</h3>
                                <PersonnelDropdown onSelect={(value) => {
                                    setSelectedEmployee(value);
                                }} />
                                <TrainingDropdown onSelect={(value) => {
                                    setSelectedTraining(value);
                                }} />
                                <input
                                    type="date"
                                    id='add-personnel-training-date-input'
                                    required
                                />
                                <input type="submit" value="Add Personnel Training" />
                            </form>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const employeeId = selectedEmployee?.id;
                                const trainingId = selectedTraining?.id;
                                const dateCompleted = document.getElementById('edit-personnel-training-date-input').value;

                                if (!employeeId || !trainingId || !dateCompleted) {
                                    console.error('Error: Employee, Training, and Date Completed are required');
                                    return;
                                }

                                fetch('http://localhost:4000/employees/trainings/', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        const matchingRecord = data.find(record =>
                                            record.employee_id === employeeId && record.training_id === trainingId
                                        );

                                        if (matchingRecord) {
                                            const recordId = matchingRecord.id;
                                            editPersonnelTraining(recordId, employeeId, trainingId, dateCompleted);
                                        } else {
                                            console.error('Error: No record found for this employee and training combination');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error fetching employee trainings:', error);
                                    });
                            }}>
                                <h3>Edit Personnel Training</h3>
                                <PersonnelDropdown onSelect={(value) => {
                                    setSelectedEmployee(value);
                                }} />
                                <TrainingDropdown onSelect={(value) => {
                                    setSelectedTraining(value);
                                }} />
                                <input
                                    type="date"
                                    id='edit-personnel-training-date-input'
                                    required
                                />
                                <input type="submit" value="Edit Personnel Training" />
                            </form>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const employeeId = selectedEmployee?.id;
                                const trainingId = selectedTraining?.id;

                                if (!employeeId || !trainingId) {
                                    console.error('Error: Employee and Training are required');
                                    return;
                                }

                                fetch('http://localhost:4000/employees/trainings/', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        const matchingRecord = data.find(record =>
                                            record.employee_id === employeeId && record.training_id === trainingId
                                        );

                                        if (matchingRecord) {
                                            const recordId = matchingRecord.id;
                                            deletePersonnelTraining(recordId);
                                        } else {
                                            console.error('Error: No record found for this employee and training combination');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error fetching employee trainings:', error);
                                    });
                            }}>
                                <h3>Remove Personnel Training</h3>
                                <PersonnelDropdown onSelect={(value) => {
                                    setSelectedEmployee(value);
                                }} />
                                <TrainingDropdown onSelect={(value) => {
                                    setSelectedTraining(value);
                                }} />
                                <input type="submit" value="Remove Personnel Training" />
                            </form>
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default Create