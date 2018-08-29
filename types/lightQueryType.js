const graphql = require('graphql');
const LightType = require('types/lightType');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'LightQuery',
    description: 'light query type',
    fields: {
        find: {
            type: LightType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('lights').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(LightType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('lights').find().toArray();
            }
        },
    }
});
