const Joi = require('joi');

const resourceSchema = Joi.object({
    id: Joi.number().default(-1),
    name: Joi.string().required(),
    path: Joi.string().required(),
    actionIds: Joi.array().items(Joi.number()),
    resourceType: Joi.string().required(),
    description: Joi.string().optional()
});

module.exports = resourceSchema;