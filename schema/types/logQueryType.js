const graphql = require('graphql');
const LogType = require('schema/types/logType');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');
const Viewer = require('utils/viewer');

module.exports = new graphql.GraphQLObjectType({
    name: 'LogQuery',
    description: 'log query type',
    fields: {
        find: {
            type: LogType,
            args: {
                _id: { type: graphql.GraphQLNonNull(MongoId) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('logs').findOne({ _id: mongo.id.new(args._id) });
            }
        },

        all: {
            type: graphql.GraphQLList(LogType),
            async resolve(parentValue, args, context) {
                Viewer.checkRole('admin', context.viewer.roles);

                return await mongo.db().collection('logs').find().toArray();
            }
        },
    }
});
