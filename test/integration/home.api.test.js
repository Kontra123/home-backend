const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

describe("Validate", () => {

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
    });

    test("Get /echo ", async () => {
        const response = await request(app).get('/echo')
        expect(response.body.data).toEqual('Hello World')
        expect(response.body.statusCode).toBe(200)
    });

});