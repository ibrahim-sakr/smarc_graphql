const express = require('express');
const express_graphql = require('express-graphql');
const rootSchema = require('./schema/rootSchema');
const DataLoader = require('./data_loader/loaderRegistry');
const mongodb = require('db/mongo');
const serverPort = 4000;

// Create an express server and a GraphQL endpoint
const app = express();

(async () => {

    await mongodb.connect();

    app.use('/graphql', express_graphql({
        schema: rootSchema,
        context: DataLoader,
        graphiql: true
    }));

})();

app.listen(serverPort, () => console.log(`GraphQL Server Running On http://127.0.0.1:${serverPort}/graphql`));

// Mutation: insert and edit resource
