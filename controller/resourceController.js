const resourcesModel = require("../model/resources.model");
const common = require("../utils/common")
const asyncHandler = require('../utils/asyncHandler');

exports.getResource = asyncHandler(async (ctx) => {
    const id = ctx.params.id;
    const resource = await resourcesModel.getResource(id);
    if(resource) {
        ctx.body = common.createResponse(resource)
    }
    else {
        ctx.body = common.createResponse(null, 404, 'Resource not found');
    }
});

exports.getAllResources = asyncHandler(async (ctx) => {
    const resources = await resourcesModel.getAllResources();
    ctx.body = common.createResponse(resources)
});

exports.createResource = asyncHandler(async (ctx) => {
    const body = ctx.request.body;
    const resource = await resourcesModel.getResource(body.id);
    if(resource) {
        ctx.body = common.createResponse(null, 404, 'Resource already exists');
    }
    else {
        const result = await resourcesModel.createResource(body);
        ctx.body = common.createResponse(result, 201)
    }
});

exports.updateResource = asyncHandler(async (ctx) => {
    const id = ctx.params.id;
    const body = ctx.request.body;
    const resource = await resourcesModel.updateResource(id, body);
    if(resource) {
        ctx.body = common.createResponse(resource);
    }
    else {
        ctx.body = common.createResponse(resource, 204, 'Resource not updated');
    }
});

exports.deleteResource = asyncHandler(async (ctx) => {
    const id = ctx.params.id;
    const resource = await resourcesModel.deleteResource(id);
    if(resource) {
        ctx.body = common.createResponse(resource, 204)
    }
    else {
        ctx.body = common.createResponse(resource, 404, 'Resource not deleted')
    }
});

