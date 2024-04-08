const common = require("../utils/common")

function validateBody(schema) {
    return async (ctx, next) => {
        const { error } = schema.validate(ctx.request.body);
        if (error) {
            ctx.body = common.createResponse(null, 400, error.details[0].message);
            return;
        }
        await next();
    };
}

module.exports = validateBody;
