const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`type Query {
  hello: String
  hero: String
}`);

const root = {
  hello: () => `Hello world`,
  hero: () => `We can be hero`,
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API SERVER ON localhost:4000");