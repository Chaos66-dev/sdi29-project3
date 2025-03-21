/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employee_trainings').del()
  await knex('employee_trainings').insert([
    {employee_id: 1, training_id: 1, date_completed: '2025-08-12'},
    {employee_id: 2, training_id: 3, date_completed: '2024-11-30'},
    {employee_id: 3, training_id: 2, date_completed: '2023-09-27'},
    {employee_id: 4, training_id: 3, date_completed: '2024-12-31'},
    {employee_id: 5, training_id: 1, date_completed: '2025-02-18'},
    {employee_id: 6, training_id: 2, date_completed: '2023-09-27'},
    {employee_id: 7, training_id: 3, date_completed: '2025-01-07'}
  ]);
};
