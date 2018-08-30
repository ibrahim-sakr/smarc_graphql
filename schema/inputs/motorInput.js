const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLInputObjectType({
    name: 'MotorInput',
    description: 'input motor payload',
    fields: {
        id: { type: graphql.GraphQLNonNull( graphql.GraphQLInt ) },
        name: { type: graphql.GraphQLNonNull( graphql.GraphQLString ) },
        room_id: { type: graphql.GraphQLNonNull( MongoId ) },
        node_id: { type: graphql.GraphQLNonNull( MongoId ) }
    }
});
