const graphql = require('graphql');
const DeviceType = require('schema/types/deviceType');
const DeviceInput = require('schema/inputs/deviceInput');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'DeviceMutation',
    description: 'device mutation type',
    fields: {
        create: {
            type: DeviceType,
            args: {
                device: { type: DeviceInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('devices').insertOne(args.device);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: DeviceType,
            args: {
                _id: { type: MongoId },
                device: { type: DeviceInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('devices').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.device
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: DeviceType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('devices').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
