/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('employees').del()
  await knex('employees').insert([
    {unit_id: 1, name: 'John Doe', rank: 'O-4', age: 34, sex: 'Male'},
    {unit_id: 1, name: 'Bob Builder', rank: 'O-1', age: 23, sex: 'Male'},
    {unit_id: 2, name: 'Jane Doe', rank: 'O-6', age: 46, sex: 'Female'},
    {unit_id: 2, name: 'Michael Davis', rank: 'E-3', age: 20, sex: 'Male'},
    {unit_id: 3, name: 'Emily Johnson', rank: 'E-5', age: 27, sex: 'Female'},
    {unit_id: 3, name: 'Sarah Brown', rank: 'O-3', age: 31, sex: 'Female'},
    {unit_id: 3, name: 'Alex Alvares', rank: 'O-8', age: 54, sex: 'Male'}
  ]);
};
