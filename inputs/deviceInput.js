const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'DeviceInput',
    description: 'input device payload',
    fields: {
        token: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) },
        details: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) }
    }
});
