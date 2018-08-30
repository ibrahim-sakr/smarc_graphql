const RoomQueryType = require('schema/types/roomQueryType');
const RoomMutationType = require('schema/types/roomMutationType');

class RoomSchema {
    static query() {
        return {
            type: RoomQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: RoomMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = RoomSchema;
