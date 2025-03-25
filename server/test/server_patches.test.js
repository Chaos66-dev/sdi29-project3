const request = require('supertest');
const server = require('../src/server');
const chai = require('chai');
const expect = chai.expect;
let knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

// TODO test incorrect patches's

beforeEach(async () => {
    knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
});

afterEach(async () => {
    await knex.destroy();
});

describe('PATCH /units', () => {
    it('should be able to patch all fields in units table from /units endpoint with id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/units`)
                            .send({
                                id: 1,
                                name: 'Mission Delta 2'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/units/1')
        expect(res.status).to.equal(200)
        expect(res.body[0].name).to.equal('Mission Delta 2')
    })

    it('should be able to patch all fields in units table from /units/:id endpoint with id in url and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/units/2`)
                            .send({
                                name: '1 TES'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/units/2')
        expect(res.status).to.equal(200)
        expect(res.body[0].name).to.equal('1 TES')
    })
})

describe('PATCH /employees', () => {
    it('should be able to patch all fields in employees table from /employees endpoint with id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/employees`)
                            .send({
                                id: 4,
                                name: 'Shaq Diesel',
                                age: 3,
                                rank: 'E-9',
                                sex: 'Male',
                                unit_id: 1
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/employees/4')
        expect(res.status).to.equal(200)
        expect(res.body[0].name).to.equal('Shaq Diesel')
        expect(res.body[0].age).to.equal(3)
        expect(res.body[0].rank).to.equal('E-9')
        expect(res.body[0].sex).to.equal('Male')
        expect(res.body[0].unit_id).to.equal(1)
    })

    it('should be able to patch all fields in employees table from /employees/:id endpoint with id in url and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/employees/5`)
                            .send({
                                name: 'Jebron Lames',
                                age: 42,
                                rank: 'O-7',
                                sex: 'Male',
                                unit_id: 2
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/employees/5')
        expect(res.status).to.equal(200)
        expect(res.body[0].name).to.equal('Jebron Lames')
        expect(res.body[0].age).to.equal(42)
        expect(res.body[0].rank).to.equal('O-7')
        expect(res.body[0].sex).to.equal('Male')
        expect(res.body[0].unit_id).to.equal(2)
    })

    it('should be able to patch all fields in employee_trainings table from /employees/training endpoint with id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/employees/trainings`)
                            .send({
                                id: 2,
                                employee_id: 1,
                                training_id: 1,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/employees/trainings/1')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].employee_id).to.equal(1)
        expect(res.body[2].training_id).to.equal(1)
        expect(res.body[2].date_completed).to.equal('2024-01-30')
    })

    it('should be able to patch all fields in employee_trainings table from /employees/training/:training_id endpoint with pk_id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/employees/trainings/2`)
                            .send({
                                pk_id: 5,
                                employee_id: 2,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/employees/trainings/2')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].employee_id).to.equal(2)
        expect(res.body[2].training_id).to.equal(2)
        expect(res.body[2].date_completed).to.equal('2024-01-30')

        res = await request(server)
                            .patch(`/employees/trainings/3`)
                            .send({
                                pk_id: 5,
                                new_training_id: 2,
                                employee_id: 2,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/employees/trainings/2')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].employee_id).to.equal(2)
        expect(res.body[2].training_id).to.equal(2)
        expect(res.body[2].date_completed).to.equal('2024-01-30')
    })
})

describe('PATCH /trainings', () => {
    it('should be able to patch all fields in the trainings table from /trainings endpoint with id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/trainings`)
                            .send({
                                id: 1,
                                name: 'Total Force Awareness Training',
                                duration: '00:01:00',
                                in_person: true,
                                due_date: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/1')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].name).to.equal('Total Force Awareness Training')
        expect(res.body[0].duration).to.equal('00:01:00')
        expect(res.body[0].in_person).to.equal(true)
        expect(res.body[0].due_date).to.equal('2024-01-30')
    })

    it('should be able to patch all fields in the trainings table from /trainings/:id endpoint with id in url and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/trainings/3`)
                            .send({
                                name: 'Total Force Awareness Training',
                                duration: '00:01:00',
                                in_person: false,
                                due_date: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/3')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].name).to.equal('Total Force Awareness Training')
        expect(res.body[0].duration).to.equal('00:01:00')
        expect(res.body[0].in_person).to.equal(false)
        expect(res.body[0].due_date).to.equal('2024-01-30')
    })

    it('should be able to patch all fields in the trainings table from /trainings/:id endpoint with id in url and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/trainings/3`)
                            .send({
                                name: 'Total Force Awareness Training',
                                duration: '00:01:00',
                                in_person: false,
                                due_date: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/3')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].name).to.equal('Total Force Awareness Training')
        expect(res.body[0].duration).to.equal('00:01:00')
        expect(res.body[0].in_person).to.equal(false)
        expect(res.body[0].due_date).to.equal('2024-01-30')
    })

    it('should be able to patch all fields in the trainings table from /trainings/employees endpoint with id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/trainings/employees`)
                            .send({
                                id: 1,
                                employee_id: 2,
                                training_id: 2,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/employee/2')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
        expect(res.body[1].training_id).to.equal(2)
        expect(res.body[1].employee_id).to.equal(2)
        expect(res.body[1].date_completed).to.equal('2024-01-30')
    })

    it('should be able to patch all fields in the trainings table from /trainings/employee/:employee_id endpoint with pk_id in body and a 201 status', async () => {
        let res = await request(server)
                            .patch(`/trainings/employee/1`)
                            .send({
                                pk_id: 7,
                                training_id: 2,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/employee/1')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
        expect(res.body[1].training_id).to.equal(2)
        expect(res.body[1].employee_id).to.equal(1)
        expect(res.body[1].date_completed).to.equal('2024-01-30')

        res = await request(server)
                            .patch(`/trainings/employee/4`)
                            .send({
                                pk_id: 4,
                                training_id: 2,
                                new_employee_id: 1,
                                date_completed: '2024-01-30'
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/trainings/employee/1')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].training_id).to.equal(2)
        expect(res.body[2].employee_id).to.equal(1)
        expect(res.body[2].date_completed).to.equal('2024-01-30')
    })
})

describe('PATCH physical readiness standards', () => {
    it('should be able to patch all fields in the physical readiness tables from /phyical_readiness_standards_.... with id in body and 201 status', async () => {
        let res = await request(server)
                            .patch(`/physical_readiness_standards_men`)
                            .send({
                                id: 1,
                                name: 'Standard 42',
                                value: 42
                            })
        expect(res.status).to.equal(201)
        res = await request(server)
                        .get('/physical_readiness_standards_men')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].name).to.equal('Standard 42')
        expect(res.body[2].value).to.equal(42)
    })

    it('should be able to patch all fields in the physical readiness tables from /phyical_readiness_standards_.... with id in body and 201 status', async () => {
        let res = await request(server)
        .patch(`/physical_readiness_standards_women`)
        .send({
            id: 1,
            name: 'Standard 41',
            value: 41
        })
        expect(res.status).to.equal(201)
        res = await request(server)
                            .get('/physical_readiness_standards_women')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
        expect(res.body[2].name).to.equal('Standard 41')
        expect(res.body[2].value).to.equal(41)
    })
})