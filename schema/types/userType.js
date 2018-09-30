const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');
const rolesEnum = require('schema/enums/rolesEnum');
const handlers = require('handlers/userHandler');
const UserInput = require('schema/inputs/userInput');

const type = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'user type',
    fields: {
        _id: { type: MongoId },
        username: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
        roles: { type: graphql.GraphQLList(rolesEnum) }
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'UserQuery',
    description: 'user query type',
    fields: {
        find: {
            type,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return handlers.find(parentValue, args, context);
            }
        },

        all: {
            type: graphql.GraphQLList(type),
            async resolve(parentValue, args, context) {
                return handlers.all(parentValue, args, context);
            }
        },
    }
});

const mutation = new graphql.GraphQLObjectType({
    name: 'UserMutation',
    description: 'user mutation type',
    fields: {
        create: {
            type,
            args: {
                user: { type: UserInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                user: { type: UserInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.update(parentValue, args, context);
            }
        },

        delete: {
            type,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args, context) {
                return handlers.deletion(parentValue, args, context);
            }
        }
    }
});

module.exports = {
    type,
    query,
    mutation
};
