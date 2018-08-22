const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'UserInput',
    description: 'input represents a single user',
    fields: {
        username: { type: graphql.GraphQLInt },
        password: { type: graphql.GraphQLString },
        roles: { type: graphql.GraphQLList(graphql.GraphQLString) }
    }
});
