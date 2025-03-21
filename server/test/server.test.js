// test/server.test.js
const request = require('supertest');
const server = require('../src/server'); // import your Express app
const chai = require('chai');
const expect = chai.expect;

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
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.an('array');
        console.log(res.body)
        console.log(res.body)
        expect(res.body.message[0]).to.be.an(Object);
        expect(res.body.message[0].name).to.equal('Unit 1');
    });
});