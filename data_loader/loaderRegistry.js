const ObjectID = require('mongodb').ObjectID;
const Loader = require('data_loader/Loader');
const mongo = require('db/mongo');

// custom Loader
// solve N+1 problem
module.exports = {
    rooms: Loader(async (ids) => {
        const mongoIds = ids.map((id) => {
            return ObjectID(id);
        });
        return await mongo.db().collection('room').find({ _id: { $in: mongoIds } }).toArray();
    }),
    nodes: Loader(async (ids) => {
        const mongoIds = ids.map((id) => {
            return ObjectID(id);
        });
        return await mongo.db().collection('node').find({ _id: { $in: mongoIds } }).toArray();
    })
};
