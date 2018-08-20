const graphql = require('graphql');
const DeviceType = require('../types/deviceType');
const DeviceDB = require('../db/devices');

class DeviceSchema {
    static find() {
        return {
            type: DeviceType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return DeviceDB.filter((device) => {
                    return device._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(DeviceType),
            resolve() {
                return DeviceDB;
            }
        };
    }
}

module.exports = DeviceSchema;
