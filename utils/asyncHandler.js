const common = require('../utils/common');

const asyncHandler = (fn) => {
    return async (ctx) => {
        try {
            await fn(ctx);
        } catch (err) {
            // Error handling logic here
            console.error(err); // Log the error for debugging purposes
            ctx.body = common.createResponse(null, 500, "Internal server error");
        }
    };
}

module.exports = asyncHandler;