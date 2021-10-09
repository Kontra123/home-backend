const resourceController = require('../../controller/resourceController');
const ctxMock = require('@shopify/jest-koa-mocks')
const resourceMock = require('../mockdata/resourceRequest.json')
const model = require('../..//model/resources.model');
model.getResource = jest.fn();
model.createResource = jest.fn();

let ctxMockContext;

beforeEach(()=>{
    ctxMockContext = ctxMock.createMockContext();
})

afterEach(()=>{
    model.getResource.mockClear();
    model.createResource.mockClear();
});


describe('controller. createResource', () => {

    test('function not defined', () => {
        expect(typeof resourceController.createResource).toBe('function')
    })

    test("create resource", async ()=>{
        ctxMockContext.request.body = { id: resourceMock.id };
        model.getResource.mockReturnValue(null);

        ctxMockContext.request.body = resourceMock;
        model.createResource.mockReturnValue(resourceMock);

        await resourceController.createResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(201)

        expect(ctxMockContext.body.data).toStrictEqual(resourceMock);
    })

    
    test("resource already exists", async ()=>{
        ctxMockContext.request.body = { id: resourceMock.id };

        model.getResource.mockReturnValue(resourceMock);

        await resourceController.createResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(404)

        expect(ctxMockContext.body.data).toStrictEqual(null);

    })

    test("return 500 when throws exception", async()=>{
        model.getResource.mockRejectedValue('exception');

        await resourceController.createResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(500)
    })

});