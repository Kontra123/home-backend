const actionsModel = require("../model/actions.model");
const common = require("../utils/common")

exports.getAllActions = async (ctx) => {
    const actions = await actionsModel.getAllActions();
    ctx.body = common.createResponse(actions);
};