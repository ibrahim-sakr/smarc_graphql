const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');
const resolvers = require('resolvers/nodeResolver');
const NodeInput = require('schema/inputs/nodeInput');

const type = new graphql.GraphQLObjectType({
    name: 'Node',
    description: 'node type',
    fields: {
        _id: { type: MongoId },
        name: { type: graphql.GraphQLString },
        ip: { type: graphql.GraphQLString },
        port: { type: graphql.GraphQLString }
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'NodeQuery',
    description: 'node query type',
    fields: {
        find: {
            type,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args, context) {
                return resolvers.find(parentValue, args, context);
            }
        },

        all: {
            type: graphql.GraphQLList(type),
            async resolve(parentValue, args, context) {
                return resolvers.all(parentValue, args, context);
            }
        },
    }
});

const mutation = new graphql.GraphQLObjectType({
    name: 'NodeMutation',
    description: 'node mutation type',
    fields: {
        create: {
            type,
            args: {
                node: { type: NodeInput },
            },
            async resolve(parentValue, args, context) {
                return resolvers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                node: { type: NodeInput },
            },
            async resolve(parentValue, args, context) {
                return resolvers.update(parentValue, args, context);
            }
        },

        delete: {
            type,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args, context) {
                return resolvers.deletion(parentValue, args, context);
            }
        }
    }
});

module.exports = {
    type,
    query,
    mutation
};
