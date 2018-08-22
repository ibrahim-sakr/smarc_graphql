const graphql = require('graphql');
const MotorType = require('types/motorType');
const MotorInput = require('inputs/motorInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class MotorSchema {
    static find() {
        return {
            type: MotorType,
            args: {
                _id: { type: MongoId }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('motor').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(MotorType),
            async resolve() {
                return await mongo.db().collection('motor').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: MotorType,
            args: {
                _id: { type: MongoId },
                motor: { type: MotorInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('motor').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.motor && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('motor').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.motor
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.motor && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('motor').insertOne(args.motor);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = MotorSchema;
