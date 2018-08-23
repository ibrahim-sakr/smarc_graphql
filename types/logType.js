const graphql = require('graphql');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Log',
    description: 'log type',
    fields: {
        _id: { type: MongoId },
        log: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString }
    }
});
