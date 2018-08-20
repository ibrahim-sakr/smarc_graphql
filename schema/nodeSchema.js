const graphql = require('graphql');
const NodeType = require('../types/nodeType');
const NodeDB = require('../db/nodes');

class NodeSchema {
    static find() {
        return {
            type: NodeType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return NodeDB.filter((node) => {
                    return node._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(NodeType),
            resolve() {
                return NodeDB;
            }
        };
    }
}

module.exports = NodeSchema;
