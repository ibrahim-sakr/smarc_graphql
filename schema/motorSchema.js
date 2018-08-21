const graphql = require('graphql');
const MotorType = require('../types/motorType');
const MotorInput = require('../inputs/motorInput');
const ObjectID = require('mongodb').ObjectID;

class MotorSchema {
    static find() {
        return {
            type: MotorType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('motor').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(MotorType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('motor').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: MotorType,
            args: {
                _id: { type: graphql.GraphQLID },
                motor: { type: MotorInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('motor').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.motor && !args.delete) {
                    const updatedDocuments = await context.db.collection('motor').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.motor
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.motor && !args.delete) {
                    const insertedDocuments = await context.db.collection('motor').insertOne(args.motor);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = MotorSchema;
