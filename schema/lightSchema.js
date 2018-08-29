const LightQueryType = require('types/lightQueryType');
const LightMutationType = require('types/lightMutationType');

class LightSchema {
    static query() {
        return {
            type: LightQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: LightMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = LightSchema;
