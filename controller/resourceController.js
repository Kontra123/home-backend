const resourcesModel = require("../model/resources.model");
const common = require("../utils/common")

exports.getResource = async (ctx) => {
    try{
        const id = ctx.params.id;
        const resource = await resourcesModel.getResource(id);
        if(resource) {
            ctx.body = common.createResponse(resource)
        }
        else {
            ctx.body = common.createResponse(null, 404, 'Wrong resource id');
        }
    }
    catch(err){
        ctx.body = common.createResponse(null, 500);
    }
};

exports.getAllResources = async (ctx) => {
    try{
        const resources = await resourcesModel.getAllResources();
        if(resources && resources.length) {
            ctx.body = common.createResponse(resources)
        }
        else {
            ctx.body = common.createResponse(null, 404);
        }
    }
    catch(err){
        ctx.body = common.createResponse(null, 500);
    }
};

exports.createResource = async (ctx) => {
    try{
        const body = ctx.request.body;
        const resource = await resourcesModel.getResource(body.id);
        if(resource) {
            ctx.body = common.createResponse(null, 404, 'Resource already exists');
        }
        else {
            const result = await resourcesModel.createResource(body);
            ctx.body = common.createResponse(result, 201)
        }
    }
    catch(err){
        ctx.body = common.createResponse(null, 500);
    }

};

exports.updateResource = async (ctx) => {
    try {
        const id = ctx.params.id;
        const body = ctx.request.body;
        const resource = await resourcesModel.updateResource(id, body);
        if(resource) {
            ctx.body = common.createResponse(resource, 201);
        }
        else {
            ctx.body = common.createResponse(resource, 404, 'Resource not updated');
        }
    }
    catch(err){
        ctx.body = common.createResponse(null, 500);
    }
};

exports.deleteResource = async (ctx) => {
    try {
        const id = ctx.params.id;
        const resource = await resourcesModel.deleteResource(id);
        if(resource) {
            ctx.body = common.createResponse(resource)
        }
        else {
            ctx.body = common.createResponse(resource, 404, 'Resource not deleted')
        }
    }
    catch(err) {
        ctx.body = common.createResponse(null, 500);  
    }

};

