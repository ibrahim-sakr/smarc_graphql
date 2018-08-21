const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'RoomInput',
    description: 'input represents a single room',
    fields: {
        name: { type: graphql.GraphQLString }
    }
});
