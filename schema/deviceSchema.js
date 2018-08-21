const graphql = require('graphql');
const DeviceType = require('../types/deviceType');
const DeviceInput = require('../inputs/deviceInput');
const ObjectID = require('mongodb').ObjectID;

class DeviceSchema {
    static find() {
        return {
            type: DeviceType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('device').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(DeviceType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('device').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: DeviceType,
            args: {
                _id: { type: graphql.GraphQLID },
                device: { type: DeviceInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('device').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.device && !args.delete) {
                    const updatedDocuments = await context.db.collection('device').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.device
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.device && !args.delete) {
                    const insertedDocuments = await context.db.collection('device').insertOne(args.device);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = DeviceSchema;
