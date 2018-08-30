const graphql = require('graphql');

const type = new graphql.GraphQLObjectType({
    name: 'Details',
    description: 'device details type',
    fields: {
        key: { type: graphql.GraphQLString },
    }
});

module.exports = {
    type
};
