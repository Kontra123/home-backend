const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const resourcesMock = require('../mockdata/resources.json')
const actionsMock = require('../mockdata/actions.json')
const resourceRequestMock = require('../mockdata/resourceRequest.json')


describe("Validate", () => {

    afterAll(async () => {
        await app.close();
        await mongoose.disconnect();
    });

    test("Get /resources ", async () => {
        const response = await request(app).get('/resources')
            .send(resourcesMock);
        expect(response.body.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(5);
    });

    test("Get /resource/:id", async () => {
        const response = await request(app).get(`/resource/${resourceRequestMock.id}`)
            .send(resourceRequestMock);
        console.log(response.body.id);
        expect(response.body.statusCode).toBe(200);
        expect(response.body.data).toMatchObject(resourceRequestMock);
        expect(response.body.data.id).toStrictEqual(resourceRequestMock.id);
        expect(response.body.data).toHaveProperty('name', resourceRequestMock.name);
        expect(response.body.data).toHaveProperty('description', resourceRequestMock.description);
    });

    test("Put /resource/update", async () => {
        const response = await request(app).put(`/resource/update/${resourceRequestMock.id}`)
        .send({name: 'item 66'});
        console.log(response.body);
        expect(response.body.statusCode).toBe(201);
        expect(response.body.data).toHaveProperty('name', 'item 66');
    });

    test("Delete /resource/delete && Post /resource/create", async () => {

        //delete
        const responseDelete = await request(app).delete(`/resource/delete/${resourceRequestMock.id}`);
        expect(responseDelete.statusCode).toBe(200);

        //create
        const responseCreate = await request(app).post('/resource/create')
            .send(resourceRequestMock);
        expect(responseCreate.body.statusCode).toBe(200);
        expect(responseCreate.body.data).toHaveProperty('name', resourceRequestMock.name);
        expect(responseCreate.body.data).toHaveProperty('description', resourceRequestMock.description);
    });
});