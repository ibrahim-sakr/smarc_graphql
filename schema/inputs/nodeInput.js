const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'NodeInput',
    description: 'input node payload',
    fields: {
        name: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        ip: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        port: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) }
    }
});
