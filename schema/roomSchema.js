const graphql = require('graphql');
const RoomType = require('../types/roomType');
const RoomInput = require('../inputs/roomInput');
const ObjectID = require('mongodb').ObjectID;

class RoomSchema {
    static find() {
        return {
            type: RoomType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('room').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(RoomType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('room').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: RoomType,
            args: {
                _id: { type: graphql.GraphQLID },
                room: { type: RoomInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('room').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.room && !args.delete) {
                    const updatedDocuments = await context.db.collection('room').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.room
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.room && !args.delete) {
                    const insertedDocuments = await context.db.collection('room').insertOne(args.room);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = RoomSchema;
