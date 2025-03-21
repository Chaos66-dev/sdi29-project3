/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('physical_readiness_standards_men').del()
  await knex('physical_readiness_standards_men').insert([
    {name: 'standard 1', value: 10},
    {name: 'standard 2', value: 200},
    {name: 'standard 3', value: 32}
  ]);
};
