const graphql = require('graphql');
const UserType = require('types/userType');
const UserInput = require('inputs/userInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

module.exports = new graphql.GraphQLObjectType({
    name: 'UserMutation',
    description: 'user mutation type',
    fields: {
        create: {
            type: UserType,
            args: {
                user: { type: UserInput },
            },
            async resolve(parentValue, args) {
                const insertedDocuments = await mongo.db().collection('user').insertOne(args.user);

                return insertedDocuments.ops[0];
            }
        },

        update: {
            type: UserType,
            args: {
                _id: { type: MongoId },
                user: { type: UserInput },
            },
            async resolve(parentValue, args) {
                const updatedDocuments = await mongo.db().collection('user').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                    $set: args.user
                });

                return updatedDocuments.value;
            }
        },

        delete: {
            type: UserType,
            args: {
                _id: { type: MongoId },
            },
            async resolve(parentValue, args) {
                const deletedDocuments = await mongo.db().collection('user').findOneAndDelete({ _id: mongo.id.new(args._id) });

                return deletedDocuments.value;
            }
        }
    }
});
