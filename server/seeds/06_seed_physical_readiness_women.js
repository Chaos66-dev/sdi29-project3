/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('physical_readiness_standards_women').del()
  await knex('physical_readiness_standards_women').insert([
    {name: 'standard 1', value: 8},
    {name: 'standard 2', value: 160},
    {name: 'standard 3', value: 26}
  ]);
};
