const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'UserInput',
    description: 'input user payload',
    fields: {
        username: { type: graphql.GraphQLNonNull( graphql.GraphQLInt ) },
        password: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) },
        // roles: [ String! ]! required array of at least one string
        roles: { type: graphql.GraphQLNonNull( graphql.GraphQLList( graphql.GraphQLNonNull( graphql.GraphQLString ) ) ) }
    }
});
