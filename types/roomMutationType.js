const graphql = require('graphql');
const RoomType = require('types/roomType');
const RoomInput = require('inputs/roomInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'RoomMutation',
    description: 'room mutation type',
    fields: {
        create: {
            type: RoomType,
            args: {
                room: { type: RoomInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('rooms').insertOne(args.room);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: RoomType,
            args: {
                _id: { type: MongoId },
                room: { type: RoomInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('rooms').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.room
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: RoomType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('rooms').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
