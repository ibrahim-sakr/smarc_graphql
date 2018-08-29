const graphql = require('graphql');
const RoomType = require('types/roomType');
const NodeType = require('types/nodeType');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Light',
    description: 'light type',
    fields: {
        _id: { type: MongoId },
        id: { type: graphql.GraphQLInt },
        status: { type: graphql.GraphQLBoolean },
        name: { type: graphql.GraphQLString },
        room_id: { type: MongoId },
        node_id: { type: MongoId },
        room: {
            type: RoomType,
            async resolve(parentValue, args, context) {
                return context.loader.rooms.load(parentValue.room_id);
            }
        },
        node: {
            type: NodeType,
            async resolve(parentValue, args, context) {
                return context.loader.nodes.load(parentValue.node_id)
            }
        },
    }
});
