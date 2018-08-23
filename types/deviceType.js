const graphql = require('graphql');
const DetailsType = require('types/detailsType');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'Device',
    description: 'device type',
    fields: {
        _id: { type: MongoId },
        token: { type: graphql.GraphQLString },
        details: { type: DetailsType }
    }
});
