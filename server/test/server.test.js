// test/server.test.js
const request = require('supertest');
const server = require('../src/server'); // import your Express app
const chai = require('chai');
const expect = chai.expect;

console.log('DB Connection:', process.env.POSTGRES_DB, process.env.POSTGRES_USER);

describe('GET /', () => {
  it('should return a message with a 200 status', async () => {
    const res = await request(server).get('/'); // Supertest makes the GET request
    expect(res.status).to.equal(200); // Chai assertion
    expect(res.body.message).to.equal('I am working'); // Chai assertion
  });
});

describe('GET /units', () => {
    it('should return an object with a 200 status', async () => {
        const res = await request(server).get('/units'); // Supertest makes the GET request
        console.log('Response:', res.status, res.body); // Log response for debugging
        expect(res.status).to.equal(200);
        console.log('passed 200 assertion')
        expect(res.body).to.be.an('array');
        console.log('passed array assertion')
        console.log(res.body[0])
        console.log(typeof res.body[0])
        expect(res.body[0]).to.be.an('object');
        console.log('passed 1st index object assertion')
        expect(res.body[0].name).to.equal('Orbital Warfare Squadron');
    });
});