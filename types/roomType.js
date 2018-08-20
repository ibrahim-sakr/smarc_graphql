const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
    name: 'Room',
    description: 'room type',
    fields: {
        _id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString }
    }
});
