const express = require("express");
const { gql, ApolloServer } = require("apollo-server-express");
const http = require("http");
const path = require("path");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const typeDefs = require(path.resolve(__dirname, "../schemas/schema"));

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`Server ready on ${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
