// test/server.test.js
const request = require('supertest');
const server = require('../src/server'); // import your Express app
const chai = require('chai');
const expect = chai.expect;

console.log('DB Connection:', process.env.POSTGRES_DB, process.env.POSTGRES_USER);


// Unit testing all server api endpoints with the GET method
describe('GET /', () => {
  it('should return a message with a 200 status', async () => {
    const res = await request(server).get('/'); // Supertest makes the GET request
    expect(res.status).to.equal(200); // Chai assertion
    expect(res.body.message).to.equal('I am working'); // Chai assertion
  });
});

describe('GET /units', () => {
    it('/units should return an array with a 200 status', async () => {
        const res = await request(server).get('/units'); // Supertest makes the GET request
        // console.log('Response:', res.status, res.body); // Log response for debugging
        expect(res.status).to.equal(200);
        // console.log('passed 200 assertion')
        expect(res.body).to.be.an('array');
        // console.log('passed array assertion')
        // console.log(res.body[0])
        // console.log(typeof res.body[0])
        expect(res.body[0]).to.be.an('object');
        // console.log('passed 1st index object assertion')
        expect(res.body[0].name).to.equal('Space Electronic Warfare Squadron');
    });

    it('/units/:id should return an array of one unit with a 200 status', async () => {
        const res = await request(server).get('/units/2');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].id).to.equal(2);
        expect(res.body[0].name).to.equal("Orbital Warfare Squadron");
        expect(res.body.length).to.equal(1)
    });
  });

  describe('GET /employees', () => {
    it('should return an array of employees with 200 status', async () => {
      const res = await request(server).get('/employees');
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[3]).to.be.an('object')
      expect(res.body[3].name).to.equal('Michael Davis')
      // console.log('i am working with live updates even better than before')
    })

    it('/employees/:id should return an array of one employee with a 200 status', async () => {
        const res = await request(server).get('/employees/2');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].id).to.equal(2);
        expect(res.body[0].name).to.equal("Bob Builder");
        expect(res.body.length).to.equal(1)
    });

    it('/employees/trainings should return an array of trainings records for all employees with a 200 status', async () => {
      const res = await request(server).get('/employees/trainings')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array');
      expect(res.body[3]).to.be.an('object');
      expect(res.body[3].id).to.equal(4);
      expect(res.body[3].date_completed).to.equal("2024-12-31");
      expect(res.body.length).to.equal(7)
    })

    it('/employees/trainings/:training_id should return an array of trainings records for all employees who completed this training with a 200 status', async () => {
      const res = await request(server).get('/employees/trainings/2')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.an('object');
      expect(res.body[0].id).to.equal(3);
      expect(res.body[0].training_id).to.equal(2);
      expect(res.body[0].employee_id).to.equal(3);
      expect(res.body.length).to.equal(2)
    })


  })

  describe('GET /trainings', () => {
    it('should return an array of training courses with 200 status', async () => {
      const res = await request(server).get('/trainings')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[1]).to.be.an('object')
      expect(res.body[1].name).to.equal('SOS')
    })

    it('/trainings/:id should return an array of one training with a 200 status', async () => {
        const res = await request(server).get('/trainings/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].id).to.equal(1);
        expect(res.body[0].name).to.equal("Supra Coders");
        expect(res.body.length).to.equal(1)
    });

    it('/trainings/employees should return an array of all training records with a 200 status', async () => {
        const res = await request(server).get('/trainings/employees');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[4]).to.be.an('object');
        expect(res.body[4].id).to.equal(5);
        expect(res.body[4].date_completed).to.equal("2025-02-18");
        expect(res.body.length).to.equal(7)
    });

    it('/trainings/employees/:employee_id should return an array of all training records that a specific employee has completed with a 200 status', async () => {
        const res = await request(server).get('/trainings/employee/3');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].id).to.equal(3);
        expect(res.body[0].employee_id).to.equal(3);
        expect(res.body[0].training_id).to.equal(2);
        expect(res.body[0].date_completed).to.equal("2023-09-27");
        expect(res.body.length).to.equal(1)
    });
  })

  describe('GET /physical_readiness_standards_men', () => {
    it('should return an array of physical readiness standards for the men with 200 status', async () => {
      const res = await request(server).get('/physical_readiness_standards_men')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[2]).to.be.an('object')
      expect(res.body[2].name).to.equal('standard 3')
      expect(res.body[2].value).to.equal(32)
    })

    it('/physical_readiness_standards_men/:id should return a 404 error as this endpoint does not exist', async () => {
        const res = await request(server).get('/physical_readiness_standards_men/2');
        expect(res.status).to.equal(404);
    });
  })

  describe('GET /physical_readiness_standards_women', () => {
    it('should return an array of physical readiness standards for the women with 200 status', async () => {
      const res = await request(server).get('/physical_readiness_standards_women')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body[2]).to.be.an('object')
      expect(res.body[2].name).to.equal('standard 3')
      expect(res.body[2].value).to.equal(26)
    })

    it('/physical_readiness_standards_women/:id should return a 404 error as this endpoint does not exist', async () => {
        const res = await request(server).get('/physical_readiness_standards_women/2');
        expect(res.status).to.equal(404);
    });
})


