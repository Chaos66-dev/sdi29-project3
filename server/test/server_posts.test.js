const request = require('supertest');
const server = require('../src/server');
const chai = require('chai');
const expect = chai.expect;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

// TODO test incorrect post's

afterEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

describe('POST /units', () => {
    it('/units should handle a post with a status of 201', async () => {
        let res = await request(server)
                          .post(`/units`)
                          .send({
                            name: 'Kobayashi Maru'
                          })
        expect(res.status).to.equal(201)

        res = await request(server).get('/units')
        expect(res.status).to.equal(200)
        expect(res.body.length).to.equal(4)
    })
})

describe('POST /employees', () => {
    it('/employees should handle a post with a staus of 201', async () => {
      let res = await request(server)
                            .post(`/employees`)
                            .send({
                              name: 'Joe Shmo',
                              age: 63,
                              rank: 'O-1',
                              sex: 'Male',
                              unit_id: 2
                            })
      expect(res.status).to.equal(201)

      res = await request(server).get('/employees')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(8)
    })

    it('/employees/trainings should handle a post with a staus of 201', async () => {
      let res = await request(server)
                            .post(`/employees/trainings`)
                            .send({
                              employee_id: 5,
                              training_id: 1,
                              date_completed: '2022-08-14'
                            })
      expect(res.status).to.equal(201)

      res = await request(server).get('/employees/trainings')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(8)
    })

    it('/employees/trainings/:training_id should handle a post with a staus of 201', async () => {
      let res = await request(server)
                            .post(`/employees/trainings/2`)
                            .send({
                              employee_id: 2,
                              date_completed: '2023-12-14'
                            })
      expect(res.status).to.equal(201)

      res = await request(server).get('/employees/trainings')
      expect(res.status).to.equal(200)
      expect(res.body.length).to.equal(8)
    })
})

describe('POST /trainings', () => {
  it('/trainings should handle a post with a staus of 201', async () => {
    let res = await request(server)
                          .post(`/trainings`)
                          .send({
                            name: 'Cyber Awareness',
                            duration: '00:03:30',
                            in_person: false,
                            due_date: '2025-04-01'
                          })
    expect(res.status).to.equal(201)

    res = await request(server).get('/trainings')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(4)
  })

  it('/trainings/employees should handle a post with a staus of 201', async () => {
    let res = await request(server)
                          .post(`/trainings/employees`)
                          .send({
                            employee_id: 2,
                            training_id: 3,
                            date_completed: '2002-02-20'
                          })
    expect(res.status).to.equal(201)

    res = await request(server).get('/trainings/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(8)
  })

  it('/trainings/employee/:employee_id should handle a post with a staus of 201', async () => {
    let res = await request(server)
                          .post(`/trainings/employee/7`)
                          .send({
                            training_id: 1,
                            date_completed: '2026-09-04'
                          })
    expect(res.status).to.equal(201)

    res = await request(server).get('/trainings/employees')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(8)
  })
})

describe('POST physical readiness standards', () => {
  it('/physical_readiness_standards_men should handle a post with a staus of 201', async () => {
    let res = await request(server)
                          .post(`/physical_readiness_standards_men`)
                          .send({
                            name: 'Deadlift',
                            value: 500
                          })
    expect(res.status).to.equal(201)

    res = await request(server).get('/physical_readiness_standards_men')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(4)
  })

  it('/physical_readiness_standards_women should handle a post with a staus of 201', async () => {
    let res = await request(server)
                          .post(`/physical_readiness_standards_women`)
                          .send({
                            name: 'Deadlift',
                            value: 375
                          })
    expect(res.status).to.equal(201)

    res = await request(server).get('/physical_readiness_standards_women')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(4)
  })
})