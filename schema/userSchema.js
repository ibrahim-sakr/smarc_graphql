const graphql = require('graphql');
const UserType = require('types/userType');
const UserInput = require('inputs/userInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class UserSchema {
    static find() {
        return {
            type: UserType,
            args: {
                _id: { type: MongoId }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('user').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(UserType),
            async resolve() {
                return await mongo.db().collection('user').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: UserType,
            args: {
                _id: { type: MongoId },
                user: { type: UserInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('user').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.user && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('user').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.user
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.user && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('user').insertOne(args.user);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = UserSchema;
