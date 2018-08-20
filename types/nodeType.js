const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Node',
    description: 'node type',
    fields: {
        _id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        ip: { type: graphql.GraphQLString },
        port: { type: graphql.GraphQLString }
    }
});
