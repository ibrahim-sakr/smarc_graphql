const graphql = require('graphql');
const MotorType = require('types/motorType');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'MotorQuery',
    description: 'motor query type',
    fields: {
        find: {
            type: MotorType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('motors').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(MotorType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('motors').find().toArray();
            }
        },
    }
});
