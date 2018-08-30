const DeviceQueryType = require('schema/types/deviceQueryType');
const DeviceMutationType = require('schema/types/deviceMutationType');

const query = {
    type: DeviceQueryType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

const mutation = {
    type: DeviceMutationType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

module.exports = {
    query,
    mutation
};
