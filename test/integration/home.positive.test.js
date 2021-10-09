const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const resourcesMock = require('../mockdata/resources.json')
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
        expect(response.body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(resourcesMock[0])
            ])
        );
    });

    test("Get /resource/:id", async () => {
        const response = await request(app).get(`/resource/${resourceRequestMock.id}`)
        expect(response.body.statusCode).toBe(200);
        expect(response.body.data).toMatchObject(resourceRequestMock);
        expect(response.body.data.id).toStrictEqual(resourceRequestMock.id);
        expect(response.body.data).toHaveProperty('name', resourceRequestMock.name);
        expect(response.body.data).toHaveProperty('description', resourceRequestMock.description);
    });

    test("Put /resource/update", async () => {
        const response = await request(app).put(`/resource/update/${resourceRequestMock.id}`)
        .send({name: 'Item 77'});
        expect(response.body.statusCode).toBe(201);
        expect(response.body.data).toHaveProperty('name', 'Item 77');
    });

    test("Delete /resource/delete && Post /resource/create", async () => {

        //delete
        const responseDelete = await request(app).delete(`/resource/delete/${resourceRequestMock.id}`);
        expect(responseDelete.body.statusCode).toBe(200);

        //create
        const responseCreate = await request(app).post('/resource/create')
            .send(resourceRequestMock);
        expect(responseCreate.body.statusCode).toBe(201);
        expect(responseCreate.body.data).toHaveProperty('name', resourceRequestMock.name);
        expect(responseCreate.body.data).toHaveProperty('description', resourceRequestMock.description);
    });
});