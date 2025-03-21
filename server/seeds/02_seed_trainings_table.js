/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('training_courses').del()
  await knex('training_courses').insert([
    {name: 'Supra Coders', duration: '130:00:00', in_person: false, due_date: '2025-07-27'},
    {name: 'SOS', duration: '25:00:00', in_person: true, due_date: '2024-03-30'},
    {name: 'SAPR', duration: '00:02:00', in_person: true, due_date: '2024-12-31'}
  ]);
};
