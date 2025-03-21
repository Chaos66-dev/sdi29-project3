/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('physical_readiness_standards_women', (table) => {
        table.increments('id')
        table.string('name', 200)
        table.integer('value')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('physical_readiness_standards_women')
};
