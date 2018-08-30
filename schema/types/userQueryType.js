const graphql = require('graphql');
const UserType = require('schema/types/userType');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'UserQuery',
    description: 'user query type',
    fields: {
        find: {
            type: UserType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('user').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(UserType),
            async resolve(parentValue, args, context) {
                console.log('====================================');
                console.log('context.viewer');
                console.dir(context.viewer, { depth: 20 });
                console.log('====================================');

                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('user').find().toArray();
            }
        },
    }
});
