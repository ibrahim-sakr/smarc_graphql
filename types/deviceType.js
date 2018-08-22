const graphql = require('graphql');
const DetailsType = require('types/detailsType');

module.exports = new graphql.GraphQLObjectType({
    name: 'Device',
    description: 'device type',
    fields: {
        _id: { type: graphql.GraphQLID },
        token: { type: graphql.GraphQLString },
        details: { type: DetailsType }
    }
});
