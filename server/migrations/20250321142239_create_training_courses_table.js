/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('training_courses', (table) => {
        table.increments('id')
        table.string('name', 200)
        // creates a column for a time field of "DD:HH:MM" (Days:Hours:Minutes) to complete the course.
        // note that days can be > 99 and would be displayed as "DDD:HH:MM" etc.
        table.string('duration', 15)
        table.boolean('in_person')
        table.date('due_date')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('training_courses')
};
