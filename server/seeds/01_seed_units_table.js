/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    {name: 'Space Electronic Warfare Squadron' },
    {name: 'Orbital Warfare Squadron' },
    {name: 'Delta Intelligence Squadron' }
  ]);
};
