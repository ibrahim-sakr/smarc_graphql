const graphql = require('graphql');
const NodeType = require('types/nodeType');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'NodeQuery',
    description: 'node query type',
    fields: {
        find: {
            type: NodeType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('nodes').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(NodeType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('nodes').find().toArray();
            }
        },
    }
});
