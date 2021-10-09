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

ResourcesModel.statics.getResource = async function(id) {
    return this.findOne({id: id}).lean().catch(e => {
        errorReport(e);
        console.error('getAllResources err', e);
    });
};


ResourcesModel.statics.getAllResources = async function() {
    return this.find().catch(e => {
        errorReport(e);
        console.error('getAllResources err', e);
    });
};

ResourcesModel.statics.createResource = async function(body) {

    return new this(body).save().catch(e => {
        console.error('createResource err', e);
    });

};

ResourcesModel.statics.updateResource = async function(id, body) {

    return this.findOneAndUpdate(
        { id: id },
        { '$set': body },
        { upsert: false, new: true}
    ).lean().catch(e => {
        console.error('createResource err', e);
    });

};

ResourcesModel.statics.deleteResource = async function(id) {
    return this.findOneAndDelete({id: id}
    ).lean().catch(e => {
        console.error('createResource err', e);
    });

};

module.exports = mongoose.model('ResourcesModel', ResourcesModel);
