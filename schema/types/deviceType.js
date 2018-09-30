const graphql = require('graphql');
const DetailsType = require('schema/types/detailsType');
const MongoId = require('schema/scalars/mongoIdScalar');
const handlers = require('handlers/deviceHandler');
const DeviceInput = require('schema/inputs/deviceInput');

const type = new graphql.GraphQLObjectType({
    name: 'Device',
    description: 'device type',
    fields: {
        _id: { type: MongoId },
        token: { type: graphql.GraphQLString },
        details: { type: DetailsType.type }
    }
});

const query = new graphql.GraphQLObjectType({
    name: 'DeviceQuery',
    description: 'device query type',
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
    name: 'DeviceMutation',
    description: 'device mutation type',
    fields: {
        create: {
            type,
            args: {
                device: { type: DeviceInput },
            },
            async resolve(parentValue, args, context) {
                return handlers.create(parentValue, args, context);
            }
        },

        update: {
            type,
            args: {
                _id: { type: MongoId },
                device: { type: DeviceInput },
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
