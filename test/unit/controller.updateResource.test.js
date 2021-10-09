const resourceController = require('../../controller/resourceController');
const ctxMock = require('@shopify/jest-koa-mocks')
const resourcesMock = require('../mockdata/resources.json')
const model = require('../..//model/resources.model');
model.updateResource = jest.fn();

let ctxMockContext;

beforeEach(()=>{
    ctxMockContext = ctxMock.createMockContext();

})

afterEach(()=>{
    model.updateResource.mockClear();
});


describe('controller. updateResource', () => {

    test('function not defined', () => {
        expect(typeof resourceController.updateResource).toBe('function')
    })

    test("update resource", async ()=>{
        const mock = {...resourcesMock[0], name: 'Item 11'};
        ctxMockContext.params = { id: mock.id};
        ctxMockContext.request.body = { name: 'item 11' };

        model.updateResource.mockReturnValue(mock);

        await resourceController.updateResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(201)

        expect(ctxMockContext.body.data).toStrictEqual(mock);
    })

    
    test("resource already exists", async ()=>{
        ctxMockContext.params = { id: '12345'};

        model.updateResource.mockReturnValue(null);

        await resourceController.updateResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(404)

        expect(ctxMockContext.body.data).toStrictEqual(null);

    })

    test("return 500 when throws exception", async()=>{
        ctxMockContext.params = { id: '12345'};
        model.updateResource.mockRejectedValue('exception');

        await resourceController.updateResource(ctxMockContext);

        expect(ctxMockContext.body.statusCode).toBe(500)
    })

});