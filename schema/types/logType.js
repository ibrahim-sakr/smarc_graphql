const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');
const handlers = require('handlers/logHandler');
const LogInput = require('schema/inputs/logInput');

const type = new graphql.GraphQLObjectType({
    name: 'Log',
    description: 'log type',
    fields: {
        _id: { type: MongoId },
        log: { type: graphql.GraphQLString },
        time: { type: graphql.GraphQLString }
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'LogQuery',
    description: 'log query type',
    fields: {
        find: {
            type,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args, context) {
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
    name: 'LogMutation',
    description: 'log mutation type',
    fields: {
        create: {
            type,
            args: {
                log: { type: LogInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                log: { type: LogInput },
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
    query,
    mutation
};
