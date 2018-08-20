const Loader = require('./Loader');
const RoomDB = require('../db/rooms');
const NodeDB = require('../db/nodes');

// custom Loader
// solve N+1 problem
module.exports = {
    rooms: Loader((ids) => {
        return new Promise((resolve) => {
            const rooms = RoomDB.filter((room) => {
                return ids.indexOf(room._id) !== -1;
            });

            return resolve(rooms);
        });
    }),
    nodes: Loader((ids) => {
        return new Promise((resolve) => {
            const nodes = NodeDB.filter((node) => {
                return ids.indexOf(node._id) !== -1;
            });

            return resolve(nodes);
        });
    })
};
