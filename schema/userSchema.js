const graphql = require('graphql');
const UserType = require('../types/userType');
const UserInput = require('../inputs/userInput');
const ObjectID = require('mongodb').ObjectID;

class UserSchema {
    static find() {
        return {
            type: UserType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('user').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(UserType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('user').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: UserType,
            args: {
                _id: { type: graphql.GraphQLID },
                user: { type: UserInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('user').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.user && !args.delete) {
                    const updatedDocuments = await context.db.collection('user').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.user
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.user && !args.delete) {
                    const insertedDocuments = await context.db.collection('user').insertOne(args.user);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = UserSchema;
