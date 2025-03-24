/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    { id: 1, name: 'Space Systems Command (SSC)' },
    { id: 2, name: 'Space Operations Command (SpOC)' },
    { id: 3, name: 'Delta 4 (Space Force) - Missile Warning' }
  ]);
};
