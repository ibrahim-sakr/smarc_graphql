const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongodb = require('mongodb');

const dbHost = '127.0.0.1';
const dbPort = '27017';
const dbName = 'smarc_graphql';
let _db;

module.exports = {
    connect: async () => {
        const client = await MongoClient.connect(`mongodb://${dbHost}:${dbPort}`, {
            useNewUrlParser: true
        });
        _db = client.db(dbName);
    },

    db: () => {
        return _db;
    },

    id: {
        new: (id) => {
            return ObjectID(id);
        },
        validate: (id) => {
            return mongodb.ObjectID.isValid(id);
        }
    }
};
