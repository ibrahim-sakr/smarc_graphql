const graphql = require('graphql');
const RoomType = require('../types/roomType');
const RoomDB = require('../db/rooms');

class RoomSchema {
    static find() {
        return {
            type: RoomType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return RoomDB.filter((room) => {
                    return room._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(RoomType),
            resolve() {
                return RoomDB;
            }
        };
    }
}

module.exports = RoomSchema;
