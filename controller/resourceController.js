const HttpStatus = require("http-status");
const mockData = require('../files/mockData');
const resourcesModel = require("../model/resources.model");
const actionsModel = require("../model/actions.model");
const common = require("../utils/common")

exports.getResource = async (ctx) => {
    const id = ctx.params.id;
    const resource = await resourcesModel.getResource(id);
    ctx.body = common.createResponse(resource)
};

exports.getAllResources = async (ctx) => {
    const resources = await resourcesModel.getAllResources();
    ctx.body = common.createResponse(resources);
};

exports.createResource = async (ctx) => {
    const body = ctx.request.body;
    const resource = await resourcesModel.getResource(body.id);
    if(resource) {
        ctx.body = common.createResponse(resource, 'Resource already exists', 500);
    }
    else {
        const result = await resourcesModel.createResource(body);
        ctx.body = common.createResponse(result)
    }

};

exports.updateResource = async (ctx) => {
    const id = ctx.params.id;
    const body = ctx.request.body;
    const resource = await resourcesModel.updateResource(id, body);
    if(resource) {
        ctx.body = common.createResponse(resource, 201);
    }
    else {
        ctx.body = common.createResponse(resource, 400, 'resource not updated');
    }

};

exports.deleteResource = async (ctx) => {
    const id = ctx.params.id;
    const resource = await resourcesModel.deleteResource(id);
    if(resource) {
        ctx.body = common.createResponse(resource)
    }
    else {
        ctx.body = common.createResponse(resource, 'Resource Not deleted', 404)
    }

};

