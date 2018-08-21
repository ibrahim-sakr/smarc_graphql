const express = require('express');
const express_graphql = require('express-graphql');
const rootSchema = require('./schema/rootSchema');
const DataLoader = require('./data_loader/loaderRegistry');
const MongoClient = require('mongodb').MongoClient;

const serverPort = 4000;
const dbHost = '127.0.0.1';
const dbPort = '27017';
const dbName = 'smarc_graphql';

// Create an express server and a GraphQL endpoint
const app = express();

(async () => {

    const client = await MongoClient.connect(`mongodb://${dbHost}:${dbPort}`, {
        useNewUrlParser: true
    });

    app.use('/graphql', express_graphql({
        schema: rootSchema,
        context: {
            loader: DataLoader,
            db: client.db(dbName)
        },
        graphiql: true
    }));

})();

app.listen(serverPort, () => console.log(`GraphQL Server Running On http://127.0.0.1:${serverPort}/graphql`));

// Mutation: insert and edit resource
