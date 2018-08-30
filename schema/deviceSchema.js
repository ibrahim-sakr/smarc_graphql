const DeviceQueryType = require('schema/types/deviceQueryType');
const DeviceMutationType = require('schema/types/deviceMutationType');

class DeviceSchema {
    static query() {
        return {
            type: DeviceQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: DeviceMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = DeviceSchema;
