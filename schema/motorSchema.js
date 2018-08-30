const MotorQueryType = require('schema/types/motorQueryType');
const MotorMutationType = require('schema/types/motorMutationType');

const query = {
    type: MotorQueryType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

const mutation = {
    type: MotorMutationType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

module.exports = {
    query,
    mutation
};
