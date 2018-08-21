const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'MotorInput',
    description: 'input represents a single motor point',
    fields: {
        id: { type: graphql.GraphQLInt },
        name: { type: graphql.GraphQLString },
        room_id: { type: graphql.GraphQLID },
        node_id: { type: graphql.GraphQLID }
    }
});
