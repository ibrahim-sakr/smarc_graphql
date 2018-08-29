const express = require('express');
const express_graphql = require('express-graphql');
const rootSchema = require('schema/rootSchema');
const mongodb = require('db/mongo');
const Context = require('middlewares/context');

// config
const serverPort = 4000;

// Create an express server and a GraphQL endpoint
const app = express();

(async () => {
    await mongodb.connect();
    app.use('/graphql', Context.update, express_graphql({
        schema: rootSchema,
        graphiql: true,
        pretty: true
    }));
})();

app.listen(serverPort, () => console.log(`🚀 🚀 Server => http://127.0.0.1:${serverPort}/graphql 🚀 🚀`));

// Mutation: insert and edit resource
