const graphql = require('graphql');
const rolesEnum = require('enums/rolesEnum');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'UserInput',
    description: 'input user payload',
    fields: {
        username: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) },
        password: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) },
        // roles: [ String! ]! required array of at least one string
        roles: { type: graphql.GraphQLNonNull( graphql.GraphQLList( graphql.GraphQLNonNull( rolesEnum ) ) ) }
    }
});
