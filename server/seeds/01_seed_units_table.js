/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('units').del()
  await knex('units').insert([
    { name: 'Space Systems Command (SSC)' },
    { name: 'Space Operations Command (SpOC)' },
    { name: 'Delta 4 (Space Force) - Missile Warning' }
  ]);
};
