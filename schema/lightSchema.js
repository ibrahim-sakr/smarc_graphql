const graphql = require('graphql');
const LightType = require('../types/lightType');
const LightDB = require('../db/lights');

class LightSchema {
    static find() {
        return {
            type: LightType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return LightDB.filter((point) => {
                    return point._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LightType),
            resolve() {
                return LightDB;
            }
        };
    }
}

module.exports = LightSchema;
