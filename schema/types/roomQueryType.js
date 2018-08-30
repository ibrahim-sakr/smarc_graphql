const graphql = require('graphql');
const RoomType = require('schema/types/roomType');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'RoomQuery',
    description: 'room query type',
    fields: {
        find: {
            type: RoomType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('rooms').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(RoomType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('rooms').find().toArray();
            }
        },
    }
});
