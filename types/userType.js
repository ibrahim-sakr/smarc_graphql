const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'user type',
    fields: {
        _id: { type: graphql.GraphQLID },
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        roles: { type: graphql.GraphQLList(graphql.GraphQLString) }
    }
});
