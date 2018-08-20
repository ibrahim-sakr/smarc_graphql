const graphql = require('graphql');
const MotorType = require('../types/motorType');
const MotorDB = require('../db/motors');

class MotorSchema {
    static find() {
        return {
            type: MotorType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return MotorDB.filter((motor) => {
                    return motor._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(MotorType),
            resolve() {
                return MotorDB;
            }
        };
    }
}

module.exports = MotorSchema;
