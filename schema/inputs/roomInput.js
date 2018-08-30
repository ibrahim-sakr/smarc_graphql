const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'RoomInput',
    description: 'input room payload',
    fields: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
    }
});
