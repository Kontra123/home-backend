const resourceController = require('../../controller/resourceController');
const ctxMock = require('@shopify/jest-koa-mocks')
const resourcesMock = require('../mockdata/resources.json')
const model = require('../..//model/resources.model');
model.deleteResource = jest.fn();

let ctxMockContext;
let mock;

beforeEach(()=>{
    ctxMockContext = ctxMock.createMockContext();
    mock = resourcesMock[0];
    ctxMockContext.params = { id: mock.id};

})

afterEach(()=>{
    model.deleteResource.mockClear();
});


describe('controller. deleteResource', () => {

    test('function not defined', () => {
        expect(typeof resourceController.deleteResource).toBe('function')
    })

    test("delete resource", async ()=>{
        model.deleteResource.mockReturnValue(mock);

        await resourceController.deleteResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(200)

        expect(ctxMockContext.body.data).toStrictEqual(mock);
    })

    
    test("return 404 when resource not exists in db", async ()=>{
        model.deleteResource.mockReturnValue(null);

        await resourceController.deleteResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(404)

        expect(ctxMockContext.body.data).toStrictEqual(null);

    })

    test("return 500 when throws exception", async()=>{
        model.deleteResource.mockRejectedValue('exception');

        await resourceController.deleteResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(500)
    })

});