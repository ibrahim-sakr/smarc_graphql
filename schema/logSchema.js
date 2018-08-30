const LogQueryType = require('schema/types/logQueryType');
const LogMutationType = require('schema/types/logMutationType');

class LogSchema {
    static query() {
        return {
            type: LogQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: LogMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = LogSchema;
