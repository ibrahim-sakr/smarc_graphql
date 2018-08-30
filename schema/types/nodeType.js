const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Node',
    description: 'node type',
    fields: {
        _id: { type: MongoId },
        name: { type: graphql.GraphQLString },
        ip: { type: graphql.GraphQLString },
        port: { type: graphql.GraphQLString }
    }
});
