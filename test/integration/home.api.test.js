const request = require('supertest');
const app = require('../../server');
const endpointUrl = "/api";
const mongoose = require('mongoose');

describe("Validate", () => {

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
    });

    test("Get /echo ", async () => {
        const response = await request(app).get('/echo')
        expect(response.text).toEqual('Hello World')
        expect(response.statusCode).toBe(200)
    });

});