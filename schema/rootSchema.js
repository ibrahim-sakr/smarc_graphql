const graphql = require('graphql');
const LightSchema = require('../schema/lightSchema');
const DeviceSchema = require('../schema/deviceSchema');
const MotorSchema = require('../schema/motorSchema');
const LogSchema = require('../schema/logSchema');
const RoomSchema = require('../schema/roomSchema');
const NodeSchema = require('../schema/nodeSchema');
const UserSchema = require('../schema/userSchema');

const queryType = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        light: LightSchema.find(),
        lights: LightSchema.all(),

        device: DeviceSchema.find(),
        devices: DeviceSchema.all(),

        motor: MotorSchema.find(),
        motors: MotorSchema.all(),

        log: LogSchema.find(),
        logs: LogSchema.all(),

        room: RoomSchema.find(),
        rooms: RoomSchema.all(),

        node: NodeSchema.find(),
        nodes: NodeSchema.all(),

        user: UserSchema.find(),
        users: UserSchema.all(),
    }
});

const mutationType = new graphql.GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        light: LightSchema.mutation(),
        // device: DeviceSchema.create(),
        // motor: MotorSchema.create(),
        // log: LogSchema.create(),
        // room: RoomSchema.create(),
        // node: NodeSchema.create(),
        // user: UserSchema.create(),
    }
});

module.exports = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});
