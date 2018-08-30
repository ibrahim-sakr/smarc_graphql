const graphql = require('graphql');
const DetailsType = require('schema/types/detailsType');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Device',
    description: 'device type',
    fields: {
        _id: { type: MongoId },
        token: { type: graphql.GraphQLString },
        details: { type: DetailsType }
    }
});
