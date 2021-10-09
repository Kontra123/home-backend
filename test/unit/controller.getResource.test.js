const resourceController = require('../../controller/resourceController');
const ctxMock = require('@shopify/jest-koa-mocks')
const resourcesMock = require('../mockdata/resources.json')
const model = require('../..//model/resources.model');
model.getResource = jest.fn();

let ctxMockContext;

beforeEach(()=>{
    ctxMockContext = ctxMock.createMockContext();
    ctxMockContext.params = {};
})

afterEach(()=>{
    model.getResource.mockClear();
});


describe('controller. getResource', () => {

    test('function not defined', () => {
        expect(typeof resourceController.getResource).toBe('function')
    })

    test("return a resource by id", async ()=>{
        ctxMockContext.params.id = resourcesMock[0].id;

        model.getResource.mockReturnValue(resourcesMock[0]);

        await resourceController.getResource(ctxMockContext);

        expect(model.getResource).toHaveBeenCalledWith(ctxMockContext.params.id);

        expect(ctxMockContext.body.statusCode).toBe(200)

        expect(ctxMockContext.body.data).toStrictEqual(resourcesMock[0]);
    })

    
    test("return 404 when id not find", async ()=>{
        model.getResource.mockReturnValue(null);

        await resourceController.getResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(404)

    })

    test("return 500 when throws exception", async()=>{
        model.getResource.mockRejectedValue('exception');

        await resourceController.getResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(500)
    })

});