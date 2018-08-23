const graphql = require('graphql');
const NodeType = require('types/nodeType');
const NodeInput = require('inputs/nodeInput');
const mongo = require('db/mongo');
const MongoId = require('scalars/mongoIdScalar');

class NodeSchema {
    static find() {
        return {
            type: NodeType,
            args: {
                _id: { type: graphql.GraphQLNonNull( MongoId ) }
            },
            async resolve(parentValue, args) {
                return await mongo.db().collection('node').findOne({ _id: mongo.id.new(args._id) });
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(NodeType),
            async resolve() {
                return await mongo.db().collection('node').find().toArray();
            }
        };
    }

    static mutation() {
        return {
            type: NodeType,
            args: {
                _id: { type: MongoId },
                node: { type: NodeInput },
                delete: { type: graphql.GraphQLBoolean }
            },
            async resolve(parentValue, args) {
                // delete exist document
                if (args._id && args.delete) {
                    const deletedDocuments = await mongo.db().collection('node').findOneAndDelete({ _id: mongo.id.new(args._id) });

                    return deletedDocuments.value;
                }

                // update exists document
                if (args._id && args.node && !args.delete) {
                    const updatedDocuments = await mongo.db().collection('node').findOneAndUpdate({ _id: mongo.id.new(args._id) }, {
                        $set: args.node
                    });

                    return updatedDocuments.value;
                }

                // create new document
                if (!args._id && args.node && !args.delete) {
                    const insertedDocuments = await mongo.db().collection('node').insertOne(args.node);

                    return insertedDocuments.ops[0];
                }

                // return error
                return new Error('you must provide a correct params');
            }
        };
    }
}

module.exports = NodeSchema;
