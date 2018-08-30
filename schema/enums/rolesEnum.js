const graphql = require('graphql');

module.exports = new graphql.GraphQLEnumType({
    name: 'RolesEnum',
    description: 'available roles as enum',
    values: {
        admin: { value: 'admin' },
        user: { value: 'user' },
    },
});
