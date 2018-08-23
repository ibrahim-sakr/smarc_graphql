const graphql = require('graphql');
const DeviceType = require('types/deviceType');
const DeviceInput = require('inputs/deviceInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class DeviceSchema {
    static find() {
        return {
            type: DeviceType,
            args: {
                _id: { type: graphql.GraphQLNonNull( MongoId ) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('device').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(DeviceType),
            async resolve() {
                return await mongo.db().collection('device').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: DeviceType,
            args: {
                _id: { type: MongoId },
                device: { type: DeviceInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('device').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.device && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('device').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.device
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.device && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('device').insertOne(args.device);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = DeviceSchema;
