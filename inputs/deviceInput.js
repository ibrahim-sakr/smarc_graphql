const graphql = require('graphql');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'DeviceInput',
    description: 'input represents a single device',
    fields: {
        token: { type: graphql.GraphQLString },
        details: { type: graphql.GraphQLString }
    }
});
