const graphql = require('graphql');
const LightSchema = require('schema/lightSchema');
const DeviceSchema = require('schema/deviceSchema');
const MotorSchema = require('schema/motorSchema');
const LogSchema = require('schema/logSchema');
const RoomSchema = require('schema/roomSchema');
const NodeSchema = require('schema/nodeSchema');
const UserSchema = require('schema/userSchema');
const AuthSchema = require('schema/authSchema');

const queryType = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    description: 'the main query type',
    fields: {
        lights: LightSchema.query,
        devices: DeviceSchema.query,
        motors: MotorSchema.query,
        logs: LogSchema.query,
        rooms: RoomSchema.query,
        nodes: NodeSchema.query,
        users: UserSchema.query,
    }
});

const mutationType = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    description: 'the main mutation type',
    fields: {
        lights: LightSchema.mutation,
        devices: DeviceSchema.mutation,
        motors: MotorSchema.mutation,
        logs: LogSchema.mutation,
        rooms: RoomSchema.mutation,
        nodes: NodeSchema.mutation,
        users: UserSchema.mutation,
        token: AuthSchema.mutation,
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
