const UserQueryType = require('schema/types/userQueryType');
const UserMutationType = require('schema/types/userMutationType');

const query = {
    type: UserQueryType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

const mutation = {
    type: UserMutationType,
    resolve() {
        // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
        return '';
    }
};

module.exports = {
    query,
    mutation
};
