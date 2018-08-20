const graphql = require('graphql');
const LogType = require('../types/logType');
const LogDB = require('../db/logs');

class LogSchema {
    static find() {
        return {
            type: LogType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return LogDB.filter((log) => {
                    return log._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(LogType),
            resolve() {
                return LogDB;
            }
        };
    }
}

module.exports = LogSchema;
