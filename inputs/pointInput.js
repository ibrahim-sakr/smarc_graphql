const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'PointInput',
    description: 'input represents a single light point',
    fields: {
        id: { type: graphql.GraphQLInt },
        name: { type: graphql.GraphQLString },
        room_id: { type: graphql.GraphQLString },
        node_id: { type: graphql.GraphQLString }
    }
});
