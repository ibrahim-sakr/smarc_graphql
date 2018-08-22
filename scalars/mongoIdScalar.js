const graphql = require('graphql');
const mongo = require('db/mongo');

const serializeMongoId = (value) => {
    if (mongo.id.validate(value)) {
        return value;
    }
    throw new Error('the id is not a valid mongodb id');
};

const parseMongoId = (value) => {
    if (mongo.id.validate(value)) {
        return value;
    }
    throw new Error('the id is not a valid mongodb id');
};

const parseLiteralMongoId = (ast) => {
    if (mongo.id.validate(ast.value)) {
        return ast.value;
    }
    throw new Error('the id is not a valid mongodb id');
};

module.exports = new graphql.GraphQLScalarType({
    name: 'MongoId',
    description: '24 char represent a valid mongodb ObjectID',
    serialize: serializeMongoId,
    parseValue: parseMongoId,
    parseLiteral: parseLiteralMongoId,
});
