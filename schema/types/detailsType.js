const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Details',
    description: 'device details type',
    fields: {
        key: { type: graphql.GraphQLString },
    }
});
