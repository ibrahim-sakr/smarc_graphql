const express = require('express');
const express_graphql = require('express-graphql');
const rootSchema = require('./schema/rootSchema');
const DataLoader = require('./data_loader/loaderRegistry');

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', express_graphql({
    schema: rootSchema,
    context: DataLoader,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

// Mutation: insert and edit resource
