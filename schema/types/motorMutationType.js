const graphql = require('graphql');
const MotorType = require('schema/types/motorType');
const MotorInput = require('schema/inputs/motorInput');
const mongo = require('db/mongo');
const MongoId = require('schema/scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'MotorMutation',
    description: 'motor mutation type',
    fields: {
        create: {
            type: MotorType,
            args: {
                motor: { type: MotorInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('motors').insertOne(args.motor);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: MotorType,
            args: {
                _id: { type: MongoId },
                motor: { type: MotorInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('motors').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.motor
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: MotorType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('motors').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
