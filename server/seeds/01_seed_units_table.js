/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {name: 'Unit 1'},
    {name: 'Unit 2'},
    {name: 'Unit 3'}
  ]);
};
