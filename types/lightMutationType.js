const graphql = require('graphql');
const LightType = require('types/lightType');
const LightInput = require('inputs/lightInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'LightMutation',
    description: 'light mutation type',
    fields: {
        create: {
            type: LightType,
            args: {
                light: { type: LightInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('lights').insertOne(args.light);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: LightType,
            args: {
                _id: { type: MongoId },
                light: { type: LightInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('lights').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.light
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: LightType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('lights').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
