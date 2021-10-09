const resourceController = require('../../controller/resourceController');
const ctxMock = require('@shopify/jest-koa-mocks')
const resourcesMock = require('../mockdata/resources.json')
const model = require('../..//model/resources.model');
model.getAllResources = jest.fn();

let ctxMockContext;

beforeEach(()=>{
    ctxMockContext = ctxMock.createMockContext();
})

afterEach(()=>{
    model.getAllResources.mockClear();
});


describe('controller. getResources', () => {

    test('function not defined', () => {
        expect(typeof resourceController.getAllResources).toBe('function')
    })

    test("return all resources", async ()=>{

        model.getAllResources.mockReturnValue(resourcesMock);

        await resourceController.getAllResources(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(200)

        expect(ctxMockContext.body.data).toStrictEqual(resourcesMock);
    })

    
    test("return 404 when id not find", async ()=>{
        model.getAllResources.mockReturnValue(null);

        await resourceController.getAllResources(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(404)

    })

    test("return 500 when throws exception", async()=>{
        model.getAllResources.mockRejectedValue('exception');

        await resourceController.getAllResources(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(500)
    })

});