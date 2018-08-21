const graphql = require('graphql');
const RoomType = require('./roomType');
const NodeType = require('./nodeType');

module.exports = new graphql.GraphQLObjectType({
    name: 'Light',
    description: 'light type',
    fields: {
        _id: { type: graphql.GraphQLID },
        id: { type: graphql.GraphQLInt },
        status: { type: graphql.GraphQLBoolean },
        name: { type: graphql.GraphQLString },
        room_id: { type: graphql.GraphQLString },
        node_id: { type: graphql.GraphQLString },
        room: {
            type: RoomType,
            async resolve(parentValue, args, context) {
                return context.loader.rooms.load(parentValue.room_id)
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
