const cors = require('cors');
const express = require('express');
const server = express();

server.use(express.json());
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);
server.use(cors()); // Enable CORS for all origins

server.get('/',  (req, res) =>  {
    res.status(200).json({message: "I am working"})
});

// ALL POSTS AND PATCHES NEED SOME FORM OF INPUT CHECKING TO ENSURE THE DATA IS IN THE CORRECT FORMAT
// ALL POSTS NEED A WAY TO CHECK THROUGH THE DATABASE TO ENSURE THEY CAN ALLOCATE UNUSED ID'S AS A RESULT OF DELETIONS

// Change check logic for the count to be the last resort with a check to make sure we are using up the numbers that may have been deleted
// Slight rework of the logic needed if an id was deleted from the database the id might be right but higher than the total count which would never resolve correctly
// the const that reads from the req.body is just assuming that the order of information is correct and fully there we have a check for empty keys but none for incorrect data types in the wrong field.

// Routes to cover with all CRUD (GET, POST, PATCH, DELETE) functionality
// /units
// Should be fine
server.get('/units', async (req, res) => {
    try {
        const query = await knex('units')
                                .select('*')
        res.status(200).json(query)
    } catch (error) {
        console.error('Error fetching units:', error);
        res.status(500).json({ error: 'Failed to retrieve units' });
    }
})

// Should be fixed needs testing to ensure id's are handled correctly
server.post('/units', async (req, res) => {
    const { name } = req.body;

    // Validate 'name'
    if (typeof name !== "string" || name.trim() === '') {
        return res.status(400).json({ message: 'Name must be a non-empty string.' });
    }

    try {
        // // Fetch all existing unit IDs
        const insert = await knex('units').insert({ name }).returning('*');

        // Respond with success
        if (insert.length == 1) {
            res.status(201).json({
                message: `Unit created successfully`,
            });
        } else {
            res.status(404).json({error: 'Error inserting new unit'})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.patch('/units', async(req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include id of unit to patch from this endpoint' });
        return
    }

    const { name } = req.body
    const updates = { name };
    // removing undefined values to only keep the columns we want to p
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    // TODO type check name
    try {
        const patch = await knex('units')
                                .where('id', id)
                                .update(updates)

        if (patch == 1){
            res.status(201).json({message: `Patch for unit ${id} was successful`})
        } else {
            res.status(404).json({error: `Could not patch unit with id ${id}`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

server.delete('/units', async (req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include id of unit to delete from this endpoint' });
        return
    }

    try {
        const del = await knex('units')
                            .where('id', id)
                            .del()
        if (del == 1) {
            res.status(200).json({message: `Unit with id: ${id} successfully deleted`})
        } else {
            res.status(404).json({message: `Could not find unit with id: ${id} to delete`})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
})


// /units/:id
// Slight rework of the logic needed if an id was deleted from the database the id might be right but higher than the total count which would never resolve correctly
server.get('/units/:id(\\d+)', async (req, res) =>{
    const id = parseInt(req.params.id)

    if(id > await knex('units').count('id')){
        res.status(500).json({error: "unit id not found"})
    }
    try{
        const selectedUnit = await knex('units')
                                    .select('*')
                                    .where('id', id)
        res.status(200).json(selectedUnit)
    } catch(error){
        res.status(500).json({error: 'Failed to retrieve unit by id'})
    }
})

// TODO POST

// the const that reads from the req.body is just assuming that the order of information is correct and fully there we have a check for empty keys but none for incorrect data types in the wrong field.
server.patch('/units/:id(\\d+)', async (req, res) =>{
    const id = parseInt(req.params.id)
    try {
        const { name } = req.body
        const updates = { name };
        // removing undefined values to only keep the columns we want to p
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        // ensures there is an id present
        if (typeof id !== 'number' || isNaN(id)) {
            res.status(400).json({ error: 'Invalid or missing fields. Must include number id of unit to update' });
            return
        }

        // TODO input check the fields

        // updates the employee
        const updatedRows = await knex('units')
                .where('id', id)
                .update(updates);

        if (updatedRows === 0) {
            res.status(404).json({ error: 'Unit not found' });
            return
        }

        res.status(201).json({ message: 'Unit updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update unit' });
    }
})

// Same as the get logic if we submit a number higher than the total and the database has deleted information this will not work
server.delete('/units/:id(\\d+)', async (req, res) =>{
    const id = parseInt(req.params.id)
    if(id > await knex('units').count('id')){
        res.status(500).json({error: "unit id not found"})
    }
    try{
        const deletedUnit = await knex('units')
                                    .select('*')
                                    .where('id', id)
                                    .del()
        if (deletedUnit == 1){
            res.status(200).json({message: 'Unit successfully deleted'})
        } else {
            res.status(404).json({message: 'Could not find unit with that id'})
        }
    } catch(error) {
        res.status(500).json({error: 'Failed to delete unit by id'})
    }

})

// /employees
// Checked
server.get('/employees', async (req, res) => {
    try {
        const query = await knex('employees')
                                .select('*')
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve employees' });
    }
})

// Would like to have some way to verify that the data was sent in the correct order somehow
server.post('/employees', async (req, res) => {
    const {name, age, rank, unit_id, sex} = req.body

    // input checking of the req.body
    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof age !== 'number' || isNaN(age) ||
        typeof rank !== 'string' || rank.trim() === '' ||
        typeof unit_id !== 'number' || isNaN(unit_id) ||
        typeof sex !== 'string' || sex.trim() === ''
    ) {
        res.status(400).json({ error: 'Invalid or missing fields' });
        return
    }
    try {
        // Fetch all existing unit IDs
        // const existingIds = await knex('employees').pluck('id');

        // // Find the maximum ID and determine the next available ID
        // const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
        // const allPossibleIds = Array.from({ length: maxId }, (_, i) => i + 1);
        // const unusedIds = allPossibleIds.filter(id => !existingIds.includes(id));

        // // Determine the unit_id
        // const employee_id = unusedIds.length > 0
        //     ? unusedIds[0]  // Select the first unused ID from the list
        //     : allPossibleIds.find(id => !existingIds.includes(id)); // Find an unused ID dynamically


        // console.log(`Generated employee_id: ${employee_id}`); // Debug logging

        // Insert the new unit
        const insert = await knex('employees').insert({ name: name, age: age, rank: rank, unit_id: unit_id, sex: sex });

        // Respond with success
        return res.status(201).json({
            message: `Employee created successfully`,
        });
    } catch (error) {
        console.error('Error during unit creation:', error); // Log error for debugging
        return res.status(500).json({ error: 'Failed to create new unit.' });
    }
})

// same as the above patch just need some sort of check for a missing id in the count we have so far
server.patch('/employees', async (req, res) => {
    try {
        const { unit_id, name, age, sex, rank, } = req.body
        const id = parseInt(req.body.id)
        const updates = { id, unit_id, name, age, sex, rank };
        // removing undefined values to only keep the columns we want to p
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        // ensures there is an id present
        if (typeof id !== 'number' || isNaN(id)) {
            res.status(400).json({ error: 'Invalid or missing fields. Must include id of employee to update if updating from this endpoint' });
            return
        }

        // TODO input check the fields

        // updates the employee
        const updatedRows = await knex('employees')
                .where('id', id)
                .update(updates);

        if (updatedRows === 0) {
            res.status(404).json({ error: 'Employee not found' });
            return
        }

        res.status(201).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
})

// Checked
server.delete('/employees', async (req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include id of employee to delete if deleting from this endpoint' });
        return
    }

    try {
        const del_employee = await knex('employees').where('id', id).del();

        if (del_employee == 1) {
            res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employee not found' }); // If no rows were deleted
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
})

// /employees/:id
// Cheked
server.get('/employees/:id(\\d+)', async (req, res) => {
    const id  = parseInt(req.params.id)
    if (Number.isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. ID should be a number' });
        return
    }

    try {
        const emp = await knex('employees')
                            .select('*')
                            .where('id', id)
        if (emp.length !=  0) {
            res.status(200).json(emp)
        }
        else {
            res.status(404).json({error: `Employee with id: ${id} not found`})
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to get employee with id: ${id}` });
    }
})

// Empty
server.post('/employees/:id(\\d+)', (req, res) => {
    res.status(400).json({ error: 'Unable to insert new employee at this endpoint. Please use /employees to insert'})
})

// Same as other patches
server.patch('/employees/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const { unit_id, name, age, sex, rank, } = req.body
        const updates = { unit_id, name, age, sex, rank };
        // removing undefined values to only keep the columns we want to p
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        // ensures there is an id present
        if (typeof id !== 'number' || isNaN(id)) {
            res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee to update' });
            return
        }

        // TODO input check the fields

        // updates the employee
        const updatedRows = await knex('employees')
                .where('id', id)
                .update(updates);

        if (updatedRows === 0) {
            res.status(404).json({ error: 'Employee not found' });
            return
        }

        res.status(201).json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
})

// Checked
server.delete('/employees/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee to delete' });
        return
    }

    try {
        const del = await knex('employees').where('id', id).del()
        if (del == 1) {
            res.status(200).json({ message: `Employee with id: ${id}, deleted successfully` });
        }
        else {
            res.status(404).json({ error: `Employee with id: ${id}, not found` });
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete employee with id: ${id}` });
    }
})

// /employees/trainings
// Checked
server.get('/employees/trainings/', async (req, res) => {
    try {
        const query = await knex('employee_trainings').select(
                                                        'id',
                                                        'training_id',
                                                        'employee_id',
                                                        knex.raw("TO_CHAR(date_completed, 'YYYY-MM-DD') as date_completed")
                                                    )

        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query employee_trainings database'})
    }
})

// Check above for standard updates
server.post('/employees/trainings/', async (req, res) => {
    const { employee_id, training_id, date_completed } = req.body

    // type checking input
    if (
        typeof employee_id !== 'number' ||
        typeof training_id !== 'number' ||
        typeof date_completed !== 'string' || isNaN(Date.parse(date_completed))
    ) {
        return res.status(400).json({ error: 'Invalid or missing fields' });
    }

    try {
        const insert = await knex('employee_trainings').insert({ employee_id, training_id, date_completed }).returning("*")

        if (insert.length > 0) {
            res.status(201).json({ message: 'Employee training added successfully' });
        } else {
            res.status(404).json({ error: 'Failed to insert employee training' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

//  Check above for updates
server.patch('/employees/trainings/', async (req, res) => {
    const { employee_id, training_id, date_completed } = req.body
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee_training record to patch' });
        return
    }

        const updates = { employee_id, training_id, date_completed };
        // removing undefined values to only keep the columns we want to p
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        // TODO input check the fields

        try {
            // updates the employee_training record
            const updatedRows = await knex('employee_trainings')
                    .where('id', id)
                    .update(updates);

            if (updatedRows === 0) {
                res.status(404).json({ error: 'Employee training record not found' });
                return
            }

            res.status(201).json({ message: 'Employee training record updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server issue'})
        }
})

// Checked
server.delete('/employees/trainings/', async (req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee_training record to delete' });
        return
    }

    try {
        // updates the employee_training record
        const del = await knex('employee_trainings').where('id', id).del()

        if (del.length === 0) {
            res.status(404).json({ error: 'Employee training record not found' });
            return
        }

        res.status(200).json({ message: 'Employee training record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server issue'})
    }
})
// /employees/trainings/:id
/*
For all CRUD operations on this route, the parameter ":training_id" does not correspond to the primary key of the employee_trainings database records.
It is instead used to filter the employee_trainings database for records where the "training_id" is matched

The primary key, id, should be included in the body of the request under the field "pk_id".
This is required to PATCH and DELETE any record at this endpoint
*/

// Checked
server.get('/employees/trainings/:training_id', async (req, res) => {
    const training_id = parseInt(req.params.training_id)
    if (typeof training_id !== 'number' || isNaN(training_id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of the training record to get a list of employess who have completed it' });
        return
    }

    try {
        const query = await knex('employee_trainings')
                            .select('id',
                                    'training_id',
                                    'employee_id',
                                    knex.raw("TO_CHAR(date_completed, 'YYYY-MM-DD') as date_completed"))
                            .where('training_id', training_id)

        if (query.length !== 0) {
            res.status(200).json(query)
        }
        else {
            res.status(404).json({ error: 'No employees found who have completed this training'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

/*
For all CRUD operations on this route, the parameter ":training_id" does not correspond to the primary key of the employee_trainings database records.
It is instead used to filter the employee_trainings database for records where the "training_id" is matched

The primary key, id, should be included in the body of the request under the field "pk_id".
This is required to PATCH and DELETE any record at this endpoint
*/

// Check above for updates
server.post('/employees/trainings/:training_id', async (req, res) => {
    const training_id = parseInt(req.params.training_id)
    if (typeof training_id !== 'number' || isNaN(training_id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of the training record to insert an employee who has completed this training' });
        return
    }

    const { employee_id, date_completed } = req.body
    const data_to_insert = {
        training_id,
        employee_id,
        date_completed
    }

    try {
        const insert = await knex('employee_trainings').insert(data_to_insert).returning("*")

        if (insert.length == 1) {
            res.status(201).json({ error: `Employee training record successfully inserted.` })
        } else {
            res.status(400).json({ error: `Failed to insert employee training record` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

/*
For all CRUD operations on this route, the parameter ":training_id" does not correspond to the primary key of the employee_trainings database records.
It is instead used to filter the employee_trainings database for records where the "training_id" is matched

The primary key, id, should be included in the body of the request under the field "pk_id".
If the training_id, is part of the fields to be updated, it should be included in the body as "new_training_id"
This is required to PATCH and DELETE any record at this endpoint

Correct request body example is as follows
{
    pk_id: 1,
    employee_id: 2,
    new_training_id: 4,
    date_completed: 2002-08-12
}
*/

// Check above for updates
server.patch('/employees/trainings/:training_id', async (req, res) => {
    const { pk_id, employee_id, new_training_id, date_completed} = req.body
    if (
        typeof pk_id !== 'number' || isNaN(pk_id) ||
        (new_training_id && typeof new_training_id !== 'number') ||
        (employee_id && typeof employee_id !== 'number') ||
        (date_completed && typeof date_completed !== 'string')
    ) {
        return res.status(400).json({ error: 'Invalid or missing fields. Ensure pk_id is a number, new_training_id is a number (if provided), \
             employee_id is a number (if provided), and date_completed is a valid date string (if provided).' });
    }

    try {
        const updates = {};

        if (employee_id) updates.employee_id = employee_id;
        if (new_training_id) {
            updates.training_id = new_training_id;
        } else {
            updates.training_id = parseInt(req.params.training_id)
        }
        if (date_completed) updates.date_completed = date_completed;

        const updatedRows = await knex('employee_trainings')
                                    .where('id', pk_id)
                                    .update(updates);

        if (updatedRows == 0) {
            return res.status(404).json({ error: 'No matching record found to update' });
        }

        res.status(201).json({ message: `Employee training record with id ${pk_id} updated successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

/*
For all CRUD operations on this route, the parameter ":training_id" does not correspond to the primary key of the employee_trainings database records.
It is instead used to filter the employee_trainings database for records where the "training_id" is matched

The primary key, id, should be included in the body of the request under the field "pk_id".
If the training_id, is part of the fields to be updated, it should be included in the body as "new_training_id"
This is required to PATCH and DELETE any record at this endpoint

Correct request body example is as follows
{
    pk_id: 1,
    employee_id: 2,
    new_training_id: 4,
    date_completed: 2002-08-12
}
*/

// Checked
server.delete('/employees/trainings/:training_id', async (req, res) => {
    const pk_id = parseInt(req.body.pk_id)
    if (typeof pk_id !== 'number' || isNaN(pk_id)) {
        return res.status(400).json({ error: 'Please ensure pk_id is a number and included in the request body'})
    }

    try {
        const del = await knex('employee_trainings')
                                .where('id', pk_id)
                                .del()

        if (del == 1) {
            res.status(200).json({ message: `Employee training record with id: ${pk_id}, was successfully deleted`})
        } else {
            res.status(404).json({ error: `Employee training record with id: ${pk_id}, not found`})
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})


// /trainings
// Checked
server.get('/trainings', async (req, res) => {
    try {
        const query = await knex('training_courses')
                                .select('id',
                                        'name',
                                        'duration',
                                        'in_person',
                                        knex.raw("TO_CHAR(due_date, 'YYYY-MM-DD') as due_date"))
        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve trainings' });
    }
})

// Check above for updates
server.post('/trainings', async (req, res) => {
    const { name, duration, in_person, due_date} = req.body

    if (
        typeof name !== 'string' || name.trim() === ''||
        typeof duration !== 'string' || duration.trim() === ''||
        typeof due_date !== 'string' || due_date.trim() === ''
        ){
        return res.status(400).json({ message : 'Incorrect input data'})
    }
    try {
        // const existingIds = await knex('training_courses').pluck('id');

        // // Find the maximum ID and determine the next available ID
        // const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
        // const allPossibleIds = Array.from({ length: maxId }, (_, i) => i + 1);
        // const unusedIds = allPossibleIds.filter(id => !existingIds.includes(id));

        // // Determine the unit_id
        // const training_id = unusedIds.length > 0
        //     ? unusedIds[0]  // Select the first unused ID from the list
        //     : allPossibleIds.find(id => !existingIds.includes(id)); // Find an unused ID dynamically


        // console.log(`Generated trainging_id: ${training_id}`); // Debug logging

        // Insert the new unit
        const insert = await knex('training_courses').insert({ name, duration, in_person, due_date }).returning("*");

        // Respond with success
        if (insert.length == 1){
            res.status(201).json({
                message: `Training created successfully`,
            })
        } else {
            res.status(404).json({error: 'Training could not be created'})
        }
    } catch (error) {
        console.error('Error during training creation:', error); // Log error for debugging
        return res.status(500).json({ error: 'Failed to create new training.' });
    }

})

server.patch('/trainings', async (req, res) => {
    const { id, name, duration, in_person, due_date} = req.body
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of training course to patch' });
        return
    }

    const updates = {};
    if (name) updates.name = name;
    if (duration) updates.duration = duration;
    if (in_person) updates.in_person = in_person;
    if (due_date) updates.due_date = due_date;

    try {
        const patch = await knex('training_courses')
                                .where('id', id)
                                .update(updates)
        if (patch == 1) {
            res.status(201).json({message: `Training course with id: ${id} successfully updated`})
        } else {
            res.status(400).json({error: `Unable to update training course with id: ${id}`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})


server.delete('/trainings', async (req, res) => {
    const { id } = req.body
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of training course to patch' });
        return
    }

    try {
        const del = await knex('training_courses')
                            .where('id', id)
                            .del()
        if (del == 1) {
            res.status(200).json({message: `Training course with id: ${id} successfully deleted`})
        } else {
            res.status(404).json({error: `Unable to delete training course with id: ${id} as it was not found`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// /trainings/:id
server.get('/trainings/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)

    if (typeof id !== 'number' || isNaN(id)) {
        return res.status(400).json({ error: 'Please ensure id is a number'})
    }

    try {
        const query = await knex('training_courses')
                                .select('id',
                                        'name',
                                        'duration',
                                        'in_person',
                                        knex.raw("TO_CHAR(due_date, 'YYYY-MM-DD') as due_date"))
                                .where('id', id)
        if (query.length == 1) {
            res.status(200).json(query)
        } else {
            res.status(404).json({ error: `No training courses found with id: ${id}`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to query trainings with id '})
    }
})

server.post('/trainings/:id(\\d+)', (req, res) => {
    res.status(400).json({ error: 'Unable to insert new training at this endpoint. Please use /trainings to insert'})
})

server.patch('/trainings/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, duration, in_person, due_date} = req.body

    if (typeof id !== 'number' || isNaN(id)) {
        return res.status(400).json({ error: 'Please ensure id is a number'})
    }

    const updates = { name, duration, in_person, due_date };
    // removing undefined values to only keep the columns we want to p
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    try {
        const patch = await knex('training_courses')
                                .where('id', id)
                                .update(updates)
        if (patch == 1) {
            res.status(201).json({message: `Successfully updated training with id ${id}`})
        } else {
            res.status(400).json({ error: `Unable to update training with id: ${id}`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error.'})
    }
})

server.delete('/trainings/:id(\\d+)', async (req, res) => {
    const id = parseInt(req.params.id)

    if (typeof id != 'number' || isNaN(id)) {
        return res.status(400).json({ error: 'Please ensure id is a number'})
    }

    try {
        const del = await knex('training_courses')
                            .where('id', id)
                            .del()
        if (del == 1) {
            res.status(200).json({ message: `Training with id: ${id} has been deleted`})
        } else {
            res.status(404).json({ error: `Training with ${id} not found`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// /trainings/employees
server.get('/trainings/employees', async (req, res) => {
    try {
        const query = await knex('employee_trainings').select(
                                                        'id',
                                                        'training_id',
                                                        'employee_id',
                                                        knex.raw("TO_CHAR(date_completed, 'YYYY-MM-DD') as date_completed")
                                                    )

        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ error: 'Failed to query employee_trainings database'})
    }
})

server.post('/trainings/employees', async (req, res) => {
    const { employee_id, training_id, date_completed } = req.body

    // type checking input
    if (
        typeof employee_id !== 'number' ||
        typeof training_id !== 'number' ||
        typeof date_completed !== 'string'
    ) {
        return res.status(400).json({ error: 'Invalid or missing fields' });
    }

    try {
        const insert = await knex('employee_trainings').insert({ employee_id, training_id, date_completed }).returning("*")

        if (insert.length > 0) {
            res.status(201).json({ message: 'Employee training added successfully' });
        } else {
            res.status(404).json({ error: 'Failed to insert employee training' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

server.patch('/trainings/employees', async (req, res) => {
    const { employee_id, training_id, date_completed } = req.body
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee_training record to patch' });
        return
    }

        const updates = { employee_id, training_id, date_completed };
        // removing undefined values to only keep the columns we want to p
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        // TODO input check the fields

        try {
            // updates the employee_training record
            const updatedRows = await knex('employee_trainings')
                    .where('id', id)
                    .update(updates);

            if (updatedRows === 0) {
                res.status(404).json({ error: 'Employee training record not found' });
                return
            }

            res.status(201).json({ message: 'Employee training record updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server issue'})
        }
})

server.delete('/trainings/employees', async (req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of employee_training record to delete' });
        return
    }

    try {
        // updates the employee_training record
        const del = await knex('employee_trainings').where('id', id).del()

        if (del.length === 0) {
            res.status(404).json({ error: 'Employee training record not found' });
            return
        }

        res.status(200).json({ message: 'Employee training record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server issue'})
    }
})

// /trainings/employee/:employee_id
/*
For all CRUD operations on this route, the parameter ":employee_id" does not correspond to the primary key of the employee_trainings database records.
It is instead used to filter the employee_trainings database for records where the "employee_id" is matched

The primary key, id, should be included in the body of the request under the field "pk_id".
This is required to PATCH and DELETE any record at this endpoint
*/
server.get('/trainings/employee/:employee_id', async (req, res) => {
    const emp_id = parseInt(req.params.employee_id)
    if (typeof emp_id !== 'number' || isNaN(emp_id)) {
        res.status(400).json({ error: 'Invalid or missing fields. :employee_id should be a number' });
        return
    }
    try {
        const query = await knex('employee_trainings')
                                .select('id',
                                        'training_id',
                                        'employee_id',
                                        knex.raw("TO_CHAR(date_completed, 'YYYY-MM-DD') as date_completed"))
                                .where('employee_id', emp_id)
        if (query.length > 0) {
            res.status(200).json(query)
        } else {
            res.status(404).json({ error: `No training records found for employee with id ${emp_id}`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Issue'})
    }
})

server.post('/trainings/employee/:employee_id', async (req, res) => {
    const emp_id = parseInt(req.params.employee_id)
    if (typeof emp_id !== 'number' || isNaN(emp_id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Must include number id of the employee to insert an training which they have completed' });
        return
    }

    const { training_id, date_completed } = req.body
    const data_to_insert = {
        employee_id: emp_id,
        training_id,
        date_completed
    }

    try {
        const insert = await knex('employee_trainings').insert(data_to_insert).returning("*")

        if (insert.length == 1) {
            res.status(201).json({ error: `Employee training record successfully inserted.` })
        } else {
            res.status(400).json({ error: `Failed to insert employee training record` });
        }
    } catch (error) {
        // console.error('Error during training creation:', error); // Log error for debugging
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

server.patch('/trainings/employee/:employee_id', async (req, res) => {
    const { new_employee_id, training_id, date_completed} = req.body
    const pk_id = parseInt(req.body.pk_id)

    // TODO type check input fields

    try {
        const updates = {};

        if (new_employee_id){
            updates.employee_id = new_employee_id;
        } else {
            updates.employee_id = parseInt(req.params.employee_id)
        }
        if (training_id) updates.training_id = training_id;
        if (date_completed) updates.date_completed = date_completed;

        const updatedRows = await knex('employee_trainings')
                                    .where('id', pk_id)
                                    .update(updates);

        if (updatedRows == 1) {
            res.status(201).json({ message: `Employee training record with id ${pk_id} updated successfully` });
        } else {
            return res.status(404).json({ error: 'No matching record found to update' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

server.delete('/trainings/employee/:employee_id', async (req, res) => {
    const pk_id = parseInt(req.body.pk_id)
    if (typeof pk_id !== 'number' || isNaN(pk_id)) {
        return res.status(400).json({ error: 'Please ensure pk_id is a number and included in the request body'})
    }

    try {
        const del = await knex('employee_trainings')
                                .where('id', pk_id)
                                .del()

        if (del == 1) {
            res.status(200).json({ message: `Employee training record with pk_id: ${pk_id}, was successfully deleted`})
        } else {
            res.status(404).json({ error: `Employee training record with pk_id: ${pk_id}, not found`})
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

// /physical_readiness_standards_men
// Checked
server.get('/physical_readiness_standards_men', async (req, res) => {
    try {
        const query = await knex('physical_readiness_standards_men').select('*')

        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error, unable to query physical_readiness_standards_men table'})
    }
})

// Check above for the updates
server.post('/physical_readiness_standards_men', async (req, res) => {
    const {name, value} = req.body
    if ((typeof name !== 'string' || name.trim() == '') ||
        (typeof value !== 'number' || isNaN(value))) {
        return res.status(400).json({ error: 'Invalid or missing fields. Please include a name (string) and value (number) for this standard'})
    }

    try {
        const insert_standard = await knex('physical_readiness_standards_men').insert({name, value}).returning("*")

        if (insert_standard.length == 1) {
            res.status(201).json({ message: 'Men physical readiness standard successfully '})
        } else {
            res.status(404).json({ error: 'Men phyisical readiness standard could not be inserted'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})

// Check above for updates
server.patch('/physical_readiness_standards_men', async (req, res) => {
    const { name, value } = req.body
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Please include the id (number) for this standard'})
    }

    const updates = {};

    if (name) updates.name = name;
    if (value) updates.value = value;

    try {
        const updatedRows = await knex('physical_readiness_standards_men')
                                    .where('id', id)
                                    .update(updates)


        if (updatedRows == 0) {
            return res.status(404).json({ error: 'No matching record found to update' });
        }

        res.status(201).json({ message: `Men physicial readiness standard with id ${id} updated successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})

// Checked
server.delete('/physical_readiness_standards_men', async (req, res) => {
    const id  = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Please include the id (number) for this standard'})
    }

    try {
        const del = await knex('physical_readiness_standards_men')
                            .where('id', id)
                            .del()
        if (del == 1) {
            res.status(200).json({ message: `Men physical readiness standard with id: ${id}, successfully deleted`})
        } else {
            res.status(404).json({ error: `Could not find record with id: ${id} to delete`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})

// /physical_readiness_standards_women
// Checked
server.get('/physical_readiness_standards_women', async (req, res) => {
    try {
        const query = await knex('physical_readiness_standards_women').select('*')

        res.status(200).json(query)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error, unable to query physical_readiness_standards_women table'})
    }
})

// Check above for update
server.post('/physical_readiness_standards_women', async (req, res) => {
    const {name, value} = req.body
    if ((typeof name !== 'string' || name.trim() == '') ||
        (typeof value !== 'number' || isNaN(value))) {
        return res.status(400).json({ error: 'Invalid or missing fields. Please include a name (string) and value (number) for this standard'})
    }

    try {
        const insert_standard = await knex('physical_readiness_standards_women').insert({name, value}).returning("*")

        if (insert_standard.length == 1) {
            res.status(201).json({ message: 'Women physical readiness standard successfully '})
        } else {
            res.status(404).json({ error: 'Women phyisical readiness standard could not be inserted'})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})

// Check above for update
server.patch('/physical_readiness_standards_women', async (req, res) => {
    const { name, value } = req.body
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Please include the id (number) for this standard'})
    }

    const updates = {};

    if (name) updates.name = name;
    if (value) updates.value = value;

    try {
        const updatedRows = await knex('physical_readiness_standards_women')
                                    .where('id', id)
                                    .update(updates)


        if (updatedRows == 0) {
            return res.status(404).json({ error: 'No matching record found to update' });
        }

        res.status(201).json({ message: `Women physicial readiness standard with id ${id} updated successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})

server.delete('/physical_readiness_standards_women', async (req, res) => {
    const id = parseInt(req.body.id)
    if (typeof id !== 'number' || isNaN(id)) {
        res.status(400).json({ error: 'Invalid or missing fields. Please include the id (number) for this standard'})
    }

    try {
        const del = await knex('physical_readiness_standards_women')
                            .where('id', id)
                            .del()
        if (del == 1) {
            res.status(200).json({ message: `Women physical readiness standard with id: ${id}, successfully deleted`})
        } else {
            res.status(404).json({ error: `Could not find record with id: ${id} to delete`})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Sever Error'})
    }
})


module.exports = server