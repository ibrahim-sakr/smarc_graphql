const LogQueryType = require('schema/types/logQueryType');
const LogMutationType = require('schema/types/logMutationType');

const query = {
    type: LogQueryType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

const mutation = {
    type: LogMutationType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

module.exports = {
    query,
    mutation
};
