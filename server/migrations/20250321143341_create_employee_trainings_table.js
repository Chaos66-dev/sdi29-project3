/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employee_trainings', (table) => {
        table.increments('id')
        table.integer('training_id')
        table.integer('employee_id')
        table.foreign('training_id').references('training_courses.id').onDelete('CASCADE')
        table.foreign('employee_id').references('employees.id').onDelete('CASCADE')
        table.date('date_completed')
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('employee_trainings')
};
