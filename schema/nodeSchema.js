const graphql = require('graphql');
const NodeType = require('../types/nodeType');
const NodeInput = require('../inputs/nodeInput');
const ObjectID = require('mongodb').ObjectID;

class NodeSchema {
    static find() {
        return {
            type: NodeType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            async resolve(parentValue, args, context) {
                return await context.db.collection('node').findOne({ _id: ObjectID(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(NodeType),
            async resolve(parentValue, args, context) {
                return await context.db.collection('node').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: NodeType,
            args: {
                _id: { type: graphql.GraphQLID },
                node: { type: NodeInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args, context) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await context.db.collection('node').findOneAndDelete({ _id: ObjectID(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.node && !args.delete) {
                    const updatedDocuments = await context.db.collection('node').findOneAndUpdate({ _id: ObjectID(args._id) }, {
                        $set: args.node
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.node && !args.delete) {
                    const insertedDocuments = await context.db.collection('node').insertOne(args.node);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = NodeSchema;
