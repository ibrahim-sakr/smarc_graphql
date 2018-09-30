const graphql = require('graphql');
const handlers = require('handlers/motorHandler');
const RoomType = require('schema/types/roomType');
const NodeType = require('schema/types/nodeType');
const MongoId = require('schema/scalars/mongoIdScalar');
const MotorInput = require('schema/inputs/motorInput');

const type = new graphql.GraphQLObjectType({
    name: 'Motor',
    description: 'motor type',
    fields: {
        _id: { type: MongoId },
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        room_id: { type: MongoId },
        node_id: { type: MongoId },
        room: {
            type: RoomType.type,
            async resolve(parentValue, args, context) {
                return handlers.rooms(parentValue, args, context);
            }
        },
        node: {
            type: NodeType.type,
            async resolve(parentValue, args, context) {
                return handlers.nodes(parentValue, args, context);
            }
        },
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'MotorQuery',
    description: 'motor query type',
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
    name: 'MotorMutation',
    description: 'motor mutation type',
    fields: {
        create: {
            type,
            args: {
                motor: { type: MotorInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                motor: { type: MotorInput },
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
