/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', (table) => {
        table.increments('id')
        table.integer('unit_id')
        table.foreign('unit_id').references('units.id').onDelete('CASCADE')
        table.string('name', 100)
        table.string('rank', 50)
        table.integer('age')
        table.string('sex', 50)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('employees', (table) => {
        table.dropForeign('unit_id')
    })
        .then(function() {
            return knex.schema.dropTableIfExists('employees');
          })
};
