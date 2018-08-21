const graphql = require('graphql');
const LightType = require('../types/lightType');
const LightDB = require('../db/lights');
const PointInput = require('../inputs/pointInput');
const ObjectID = require('mongodb').ObjectID;

class LightSchema {
    static find() {
        return {
            type: LightType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return LightDB.filter((point) => {
                    return point._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LightType),
            resolve() {
                return LightDB;
            }
        };
    }

    static mutation() {
        return {
            type: LightType,
            args: {
                _id: { type: graphql.GraphQLID },
                point: { type: PointInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('test_collection').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.point && !args.delete) {
                    const updatedDocuments = await context.db.collection('test_collection').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.point
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.point && !args.delete) {
                    const insertedDocuments = await context.db.collection('test_collection').insertOne([args.point]);

                    return insertedDocuments.ops[0];
                }

                // return error
            }
        };
    }
}

module.exports = LightSchema;
