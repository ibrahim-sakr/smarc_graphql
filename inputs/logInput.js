const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'LogInput',
    description: 'input represents a single log entry',
    fields: {
        log: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString }
    }
});
