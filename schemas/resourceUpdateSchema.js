const Joi = require('joi');

const resourceUpdateSchema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().optional(),
    path: Joi.string().optional(),
    actionIds: Joi.array().items(Joi.number()).optional(),
    resourceType: Joi.string().optional(),
    description: Joi.string().optional()
});

module.exports = resourceUpdateSchema;
