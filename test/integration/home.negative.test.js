const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const resourcesMock = require('../mockdata/resources.json')

describe("Validate", () => {

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
    });

    test("GET /resource/:id, with wrong resource id", async () => {
        const mockId = '10'
        const responseOfGet = await request(app)
                        .get(`/resource/${mockId}`);
        expect(responseOfGet.body.statusCode).toBe(404);
        expect(responseOfGet.body.error).toEqual('Wrong resource id');

    });

    test("POST /resource/create, resource already exists", async () => {
        const responseOfPost = await request(app)
                        .post(`/resource/create`).send({id: resourcesMock[0].id});
        expect(responseOfPost.body.statusCode).toBe(404);
        expect(responseOfPost.body.error).toEqual('Resource already exists');

    });

    test("PUT /resource/update, resource not updated", async () => {
        const responseOfPut = await request(app)
                        .put('/resource/update/8').send({name: test});
        expect(responseOfPut.body.statusCode).toBe(404);
        expect(responseOfPut.body.error).toEqual('Resource not updated');

    });

    test("DELETE /resource/delete, resource not deleted", async () => {
        const responseOfDelete = await request(app)
                        .delete('/resource/delete/-1');
        expect(responseOfDelete.body.statusCode).toBe(404);
        expect(responseOfDelete.body.error).toEqual('Resource not deleted');

    });

});