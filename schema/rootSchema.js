const graphql = require('graphql');
const LightType = require('schema/types/lightType');
const DeviceType = require('schema/types/deviceType');
const MotorType = require('schema/types/motorType');
const LogType = require('schema/types/logType');
const RoomType = require('schema/types/roomType');
const NodeType = require('schema/types/nodeType');
const UserType = require('schema/types/userType');
const AuthType = require('schema/types/authType');
const TokenResolvers = require('resolvers/tokenResolver');

const queryType = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    description: 'the main query type',
    fields: {
        lights: {
            type: LightType.query,
            resolve() {
                return '';
            }
        },
        devices: {
            type: DeviceType.query,
            resolve() {
                return '';
            }
        },
        motors: {
            type: MotorType.query,
            resolve() {
                return '';
            }
        },
        logs: {
            type: LogType.query,
            resolve() {
                return '';
            }
        },
        rooms: {
            type: RoomType.query,
            resolve() {
                return '';
            }
        },
        nodes: {
            type: NodeType.query,
            resolve() {
                return '';
            }
        },
        users: {
            type: UserType.query,
            resolve() {
                return '';
            }
        },
    }
});

const mutationType = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    description: 'the main mutation type',
    fields: {
        lights: {
            type: LightType.mutation,
            resolve() {
                return '';
            }
        },
        devices: {
            type: DeviceType.mutation,
            resolve() {
                return '';
            }
        },
        motors: {
            type: MotorType.mutation,
            resolve() {
                return '';
            }
        },
        logs: {
            type: LogType.mutation,
            resolve() {
                return '';
            }
        },
        rooms: {
            type: RoomType.mutation,
            resolve() {
                return '';
            }
        },
        nodes: {
            type: NodeType.mutation,
            resolve() {
                return '';
            }
        },
        users: {
            type: UserType.mutation,
            resolve() {
                return '';
            }
        },
        token: {
            type: AuthType.type,
            args: {
                username: { type: graphql.GraphQLString },
                password: { type: graphql.GraphQLString }
            },
            async resolve(parentValue, args) {
                return TokenResolvers.generate(args);
            }
        },
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
