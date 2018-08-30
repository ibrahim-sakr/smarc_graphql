const NodeQueryType = require('schema/types/nodeQueryType');
const NodeMutationType = require('schema/types/nodeMutationType');

class NodeSchema {
    static query() {
        return {
            type: NodeQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: NodeMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = NodeSchema;
