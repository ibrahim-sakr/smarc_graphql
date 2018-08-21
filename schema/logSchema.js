const graphql = require('graphql');
const LogType = require('../types/logType');
const LogInput = require('../inputs/logInput');
const ObjectID = require('mongodb').ObjectID;

class LogSchema {
    static find() {
        return {
            type: LogType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('log').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LogType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('log').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: LogType,
            args: {
                _id: { type: graphql.GraphQLID },
                log: { type: LogInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('log').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.log && !args.delete) {
                    const updatedDocuments = await context.db.collection('log').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.log
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.log && !args.delete) {
                    const insertedDocuments = await context.db.collection('log').insertOne(args.log);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = LogSchema;
