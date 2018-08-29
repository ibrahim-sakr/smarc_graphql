const MotorQueryType = require('types/motorQueryType');
const MotorMutationType = require('types/motorMutationType');

class MotorSchema {
    static query() {
        return {
            type: MotorQueryType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }

    static mutation() {
        return {
            type: MotorMutationType,
            resolve() {
                // just place holder 'cause if it not exist the GraphQl will not read the sub-functions into UserObjectType
                return '';
            }
        }
    }
}

module.exports = MotorSchema;
