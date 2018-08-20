const graphql = require('graphql');
const UserType = require('../types/userType');
const UserDB = require('../db/users');

class UserSchema {
    static find() {
        return {
            type: UserType,
            args: {
                _id: { type: graphql.GraphQLID }
            },
            resolve(parentValue, args) {
                return UserDB.filter((user) => {
                    return user._id === args._id;
                })[0];
            }
        };
    }

    static all() {
        return {
            type: graphql.GraphQLList(UserType),
            resolve() {
                return UserDB;
            }
        };
    }
}

module.exports = UserSchema;
