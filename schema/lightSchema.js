const LightQueryType = require('schema/types/lightQueryType');
const LightMutationType = require('schema/types/lightMutationType');

const query = {
    type: LightQueryType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

const mutation = {
    type: LightMutationType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

module.exports = {
    query,
    mutation
};
