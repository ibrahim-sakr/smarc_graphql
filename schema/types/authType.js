const graphql = require('graphql');
const UserType = require('schema/types/userType');

module.exports = new graphql.GraphQLObjectType({
    name: 'Auth',
    description: 'auth type',
    fields: {
        token: { type: graphql.GraphQLString },
        viewer: { type: UserType },
    }
});
