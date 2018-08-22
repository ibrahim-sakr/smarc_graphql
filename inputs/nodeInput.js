const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'NodeInput',
    description: 'input represents a single node',
    fields: {
        name: { type: graphql.GraphQLString },
        ip: { type: graphql.GraphQLString },
        port: { type: graphql.GraphQLInt }
    }
});
