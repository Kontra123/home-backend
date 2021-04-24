const HttpStatus = require("http-status");
const mockData = require('../files/mockData');
const resourcesModel = require("../model/resources.model");

exports.getResources = async (ctx) => {
    const resource = await resourcesModel.getResources();
    ctx.body = resource;
};

exports.getActions = async (ctx) => {
    const actions = mockData.actions
    ctx.status = HttpStatus.OK;
    ctx.body = actions;
};

exports.createResource = async (ctx) => {
    const body = ctx.request.body;
    const resource = await resourcesModel.createResource(body);
    ctx.body = resource;
};

