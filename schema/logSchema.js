const graphql = require('graphql');
const LogType = require('types/logType');
const LogInput = require('inputs/logInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class LogSchema {
    static find() {
        return {
            type: LogType,
            args: {
                _id: { type: graphql.GraphQLNonNull( MongoId ) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('log').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LogType),
            async resolve() {
                return await mongo.db().collection('log').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: LogType,
            args: {
                _id: { type: MongoId },
                log: { type: LogInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('log').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.log && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('log').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.log
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.log && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('log').insertOne(args.log);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = LogSchema;
