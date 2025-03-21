/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    { id: 1, name: 'Orbital Warfare Squadron' },
    { id: 2, name: 'Space Electronic Warfare Squadron' },
    { id: 3, name: 'Delta Intelligence Squadron' }
  ]);
};
