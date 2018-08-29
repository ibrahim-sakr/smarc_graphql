const graphql = require('graphql');
const LogType = require('types/logType');
const LogInput = require('inputs/logInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'LogMutation',
    description: 'log mutation type',
    fields: {
        create: {
            type: LogType,
            args: {
                log: { type: LogInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('logs').insertOne(args.log);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: LogType,
            args: {
                _id: { type: MongoId },
                log: { type: LogInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('logs').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.log
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: LogType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('logs').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
