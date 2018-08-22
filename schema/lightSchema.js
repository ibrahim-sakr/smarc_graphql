const graphql = require('graphql');
const LightType = require('types/lightType');
const PointInput = require('inputs/pointInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class LightSchema {
    static find() {
        return {
            type: LightType,
            args: {
                _id: { type: MongoId }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('light').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LightType),
            async resolve() {
                return await mongo.db().collection('light').find({}).toArray();
            }
        };
    }

    static mutation() {
        return {
            type: LightType,
            args: {
                _id: { type: MongoId },
                point: { type: PointInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('light').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.point && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('light').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.point
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.point && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('light').insertOne(args.point);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = LightSchema;
