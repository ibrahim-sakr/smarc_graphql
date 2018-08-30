const UserQueryType = require('schema/types/userQueryType');
const UserMutationType = require('schema/types/userMutationType');

class UserSchema {
    static query() {
        return {
            type: UserQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: UserMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = UserSchema;
