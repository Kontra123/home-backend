const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const ResourcesModel = new Schema({
    id: {type: Number, default: -1},
    name: {type: String},
    path: {type: String},
    actionIds: [Number],
    resourceType: { type: String },
    description: { type: String }
})


ResourcesModel.statics.getResources = async function() {
    return this.find().catch(e => {
        errorReport(e);
        console.error('getResources err', e);
    });
};

ResourcesModel.statics.createResource = async function(body) {

    return new this(body).save().catch(e => {
        console.error('createResource err', e);
    });

};

ResourcesModel.statics.updateResource = async function(body) {

    return this.update(
        {},
        { '$set': body },
        { upsert: true, new: true}
    ).lean().catch(e => {
        console.error('createResource err', e);
    });

};

module.exports = mongoose.model('ResourcesModel', ResourcesModel);
