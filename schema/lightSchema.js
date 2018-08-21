const graphql = require('graphql');
const LightType = require('../types/lightType');
const PointInput = require('../inputs/pointInput');
const ObjectID = require('mongodb').ObjectID;

class LightSchema {
    static find() {
        return {
            type: LightType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('light').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LightType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('light').find({}).toArray();
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
                    const deletedDocuments = await context.db.collection('light').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.point && !args.delete) {
                    const updatedDocuments = await context.db.collection('light').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.point
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.point && !args.delete) {
                    const insertedDocuments = await context.db.collection('light').insertOne(args.point);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = LightSchema;
