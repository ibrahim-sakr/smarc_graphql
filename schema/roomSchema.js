const graphql = require('graphql');
const RoomType = require('types/roomType');
const RoomInput = require('inputs/roomInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class RoomSchema {
    static find() {
        return {
            type: RoomType,
            args: {
                _id: { type: graphql.GraphQLNonNull( MongoId ) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('room').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(RoomType),
            async resolve() {
                return await mongo.db().collection('room').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: RoomType,
            args: {
                _id: { type: MongoId },
                room: { type: RoomInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('room').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.room && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('room').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.room
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.room && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('room').insertOne(args.room);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = RoomSchema;
