const graphql = require('graphql');
const RoomType = require('schema/types/roomType');
const NodeType = require('schema/types/nodeType');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Motor',
    description: 'motor type',
    fields: {
        _id: { type: MongoId },
        id: { type: graphql.GraphQLString },
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
                return context.loader.nodes.load(parentValue.node_id);
            }
        },
    }
});
