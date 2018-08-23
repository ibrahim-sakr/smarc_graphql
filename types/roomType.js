const graphql = require('graphql');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Room',
    description: 'room type',
    fields: {
        _id: { type: MongoId },
        name: { type: graphql.GraphQLString }
    }
});
