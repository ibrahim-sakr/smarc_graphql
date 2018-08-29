const jwt = require('jsonwebtoken');
const mongo = require('db/mongo');

const fromAuthToken = (token = '') => {
    try {
        return jwt.verify(token, 'secret');
    } catch (e) {
        return {};
    }
};

const generateToken = async (username, password) => {
    // select the user from DB
    const viewer = await mongo.db().collection('user').findOne({
        username,
        password
    });

    if (!viewer) {
        throw new Error('the username or password is incorrect');
    }

    const token = jwt.sign(viewer, 'secret');

    return {
        token: token,
        viewer
    };
};

const checkRole = (roleName, roles = []) => {
    if (roles.indexOf(roleName) === -1) {
        throw new Error('you don\'t have the permission to access this resource');
    }
};

module.exports = { fromAuthToken, generateToken, checkRole };
