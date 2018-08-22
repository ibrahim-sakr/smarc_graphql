const graphql = require('graphql');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'MotorInput',
    description: 'input represents a single motor point',
    fields: {
        id: { type: graphql.GraphQLInt },
        name: { type: graphql.GraphQLString },
        room_id: { type: MongoId },
        node_id: { type: MongoId }
    }
});
