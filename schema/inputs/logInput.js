const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'LogInput',
    description: 'input log payload',
    fields: {
        log: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
        time: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
    }
});
