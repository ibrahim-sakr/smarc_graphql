const graphql = require('graphql');
const NodeType = require('types/nodeType');
const NodeInput = require('inputs/nodeInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'NodeMutation',
    description: 'node mutation type',
    fields: {
        create: {
            type: NodeType,
            args: {
                node: { type: NodeInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('nodes').insertOne(args.node);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: NodeType,
            args: {
                _id: { type: MongoId },
                node: { type: NodeInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('nodes').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.node
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: NodeType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('nodes').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
