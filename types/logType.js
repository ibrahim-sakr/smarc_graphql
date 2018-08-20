const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Log',
    description: 'log type',
    fields: {
        _id: { type: graphql.GraphQLID },
        log: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString }
    }
});
