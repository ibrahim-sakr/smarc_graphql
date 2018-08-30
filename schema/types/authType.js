const graphql = require('graphql');
const UserType = require('schema/types/userType');

const type = new graphql.GraphQLObjectType({
    name: 'Auth',
    description: 'auth type',
    fields: {
        token: { type: graphql.GraphQLString },
        viewer: { type: UserType.type },
    }
});

module.exports = {
    type
};
