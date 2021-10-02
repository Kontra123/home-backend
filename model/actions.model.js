const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActionsModel = new Schema({
    id: {type: Number, default: -1},
    name: {type: String},
})

ActionsModel.statics.getAllActions = async function() {
    return this.find().catch(e => {
        errorReport(e);
        console.error('getAllActions err', e);
    });
};

module.exports = mongoose.model('ActionsModel', ActionsModel);
