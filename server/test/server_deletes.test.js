const request = require('supertest');
const server = require('../src/server'); // import your Express app
const chai = require('chai');
const expect = chai.expect;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

afterEach(async () => {
    // Rollback migrations and reseed after each test if needed
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

// Unit testing all server api endpoints with the DELETE method
describe('DELETE /units', () => {
    it('should be able to delete unit by id with 200 status', async () => {
        let res = await request(server)
                          .delete(`/units`)
                          .send({
                            id: 1
                          })
        expect(res.status).to.equal(200)

        res = await request(server).get('/units')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
    });

    it('/units/:id should be able to delete unit by id in url with 200 status', async () => {
      let res = await request(server)
                          .delete(`/units/2`)
        expect(res.status).to.equal(200)

        res = await request(server).get('/units')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(2)
    })

    it('should return errors when deleting non existent id with 404 status', async () => {
      let res = await request(server)
                          .delete(`/units`)
                          .send({
                            id: 5
                          })
      expect(res.status).to.equal(404)

      res = await request(server).get('/units')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(3)

      res = await request(server)
                          .delete(`/units/12`)
        expect(res.status).to.equal(404)

        res = await request(server).get('/units')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(3)
    })
  });

describe('DELETE /employees', () => {
  it('should be able to delete employee by id with 200 status', async () => {
    let res = await request(server)
                      .delete(`/employees/`)
                      .send({
                        id: 2
                      })
    expect(res.status).to.equal(200)

    res = await request(server).get('/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)
    res = await request(server).get('/employees/2')
    expect(res.status).to.equal(404)
  })

  it('/employees/:id should be able to delete employee by id in url with 200 status', async () => {
    let res = await request(server)
                      .delete('/employees/1')
    expect(res.status).to.equal(200)

    res = await request(server).get('/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)

    res = await request(server).get('/employees/1')
    expect(res.status).to.equal(404)
  })

  it('/employees/trainings should be able to delete a training record by id in body with status 200', async () => {
    let res = await request(server)
                      .delete('/employees/trainings')
                      .send({
                        id: 4
                      })
    expect(res.status).to.equal(200)

    res = await request(server).get('/employees/trainings')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)

    res = await request(server).get('/employees/trainings/4')
    expect(res.status).to.equal(404)
  })

  it('/employees/trainings/:training_id should be able to delete a training record by id in the url with status 200', async () => {
    let res = await request(server)
                      .delete('/employees/trainings/3')
                      .send({
                        pk_id: 3
                      })
    expect(res.status).to.equal(200)

    res = await request(server).get('/employees/trainings')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)

    res = await request(server).delete('/employees/trainings/3') // doesn't specify primary key
    expect(res.status).to.equal(400)
  })
})

describe('DELETE /trainings', () => {
  it('should be able to delete training record by id in body with 200 status', async () => {
    let res = await request(server)
                        .delete('/trainings')
                        .send({
                          id: 1
                        })
    expect(res.status).to.equal(200)

    res = await request(server).get('/trainings')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(2)

    res = await request(server).delete('/trainings/1')
    expect(res.status).to.equal(404)
  })

  it('/trainings/:id should be able to delete training record by id in url with 200 status', async () => {
    let res = await request(server)
                        .delete('/trainings/3')
    expect(res.status).to.equal(200)

    res = await request(server).get('/trainings')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(2)

    res = await request(server).delete('/trainings/3')
    expect(res.status).to.equal(404)
  })

  it('/trainings/employees should be able to delete a training record by id in body with 200 status', async () => {
    let res = await request(server)
                        .delete('/trainings/employees')
                        .send({
                          id: 5
                        })
    expect(res.status).to.equal(200)

    res = await request(server).get('/trainings/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)

    res = await request(server).get('/trainings/employees/4')
    expect(res.status).to.equal(404)
  })

  it('/trainings/employee/:employee_id should be able to delete a training record by pk_id in body with 200 status', async () => {
    let res = await request(server)
                        .delete('/trainings/employee/4')
                        .send({
                          pk_id: 2
                        })
    expect(res.status).to.equal(200)

    res = await request(server).get('/trainings/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(6)

    res = await request(server).get('/trainings/employees/2')
    expect(res.status).to.equal(404)
  })
})

describe('DELETE /physical_readiness_standards', () => {
  it('should be able to delete a mens physical readiness standard by id in body with staus of 200', async () => {
    let res = await request(server)
                        .delete('/physical_readiness_standards_men')
                        .send({
                          id: 2
                        })
    expect(res.status).to.equal(200)

    res = await request(server).get('/physical_readiness_standards_men')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(2)
  })

  it('should be able to delete a womens physical readiness standard by id in body with staus of 200', async () => {
    let res = await request(server)
                        .delete('/physical_readiness_standards_women')
                        .send({
                          id: 1
                        })
    expect(res.status).to.equal(200)

    res = await request(server).get('/physical_readiness_standards_women')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(2)
  })
})