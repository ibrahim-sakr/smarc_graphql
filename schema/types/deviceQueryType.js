const graphql = require('graphql');
const DeviceType = require('schema/types/deviceType');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'DeviceQuery',
    description: 'device query type',
    fields: {
        find: {
            type: DeviceType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('devices').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(DeviceType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('devices').find().toArray();
            }
        },
    }
});
