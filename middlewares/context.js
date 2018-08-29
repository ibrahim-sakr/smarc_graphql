const Viewer = require('utils/viewer');
const DataLoader = require('data_loader/loaderRegistry');

const update = (req, res, next) => {
    req.loader = DataLoader;
    req.viewer = Viewer.fromAuthToken(req.headers.authorization);
    next();
};

module.exports = { update };
