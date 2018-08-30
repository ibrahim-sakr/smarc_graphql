const mongo = require('db/mongo');
const Viewer = require('utils/viewer');

const find = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    return await mongo.db().collection('motors').findOne({ _id: mongo.id.new(args._id) });
};

const all = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    return await mongo.db().collection('motors').find().toArray();
};

const create = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const insertedDocuments = await mongo.db().collection('motors').insertOne(args.motor);

    return insertedDocuments.ops[0];
};

const update = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const updatedDocuments = await mongo.db().collection('motors').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
        $set: args.light
    });

    return updatedDocuments.value;
};

const deletion = async (parentValue, args, context) => {
    Viewer.checkRole('admin', context.viewer.roles);

    const deletedDocuments = await mongo.db().collection('motors').findOneAndDelete({ _id: mongo.id.new(args._id) });

    return deletedDocuments.value;
};

const rooms = async (parentValue, args, context) => {
    return context.loader.rooms.load(parentValue.room_id);
};

const nodes = async (parentValue, args, context) => {
    return context.loader.nodes.load(parentValue.node_id);
};

module.exports = {
    find,
    all,
    create,
    update,
    deletion,
    rooms,
    nodes
};
