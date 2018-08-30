const Viewer = require('utils/viewer');

const generate = async (args) => {
    return Viewer.generateToken(args.username, args.password);
};

module.exports = {
    generate
};
