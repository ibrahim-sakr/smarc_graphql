const graphql = require('graphql');
const MongoId = require('schema/scalars/mongoIdScalar');
const resolvers = require('resolvers/roomResolver');
const RoomInput = require('schema/inputs/roomInput');

const type = new graphql.GraphQLObjectType({
    name: 'Room',
    description: 'room type',
    fields: {
        _id: { type: MongoId },
        name: { type: graphql.GraphQLString }
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'RoomQuery',
    description: 'room query type',
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
    name: 'RoomMutation',
    description: 'room mutation type',
    fields: {
        create: {
            type,
            args: {
                room: { type: RoomInput },
            },
            async resolve(parentValue, args, context) {
                return resolvers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                room: { type: RoomInput },
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
