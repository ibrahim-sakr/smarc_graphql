const Viewer = require('utils/viewer');
const DataLoader = require('data_loader/loaderRegistry');

const update = (req, res, next) => {
    const token = req.headers.authorization.split(' ');
    if (token[0] !== 'Bearer') {
        throw new Error('you must provide a valid authorization');
    }

    req.loader = DataLoader;
    req.viewer = Viewer.fromAuthToken(token[1]);

    next();
};

module.exports = { update };
