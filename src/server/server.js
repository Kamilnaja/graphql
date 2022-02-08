const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const path = require("path");
const { createStore } = require("../utils");
const LaunchAPI = require("../datasources/launch");
const UserAPI = require("../datasources/user");
const store = createStore();
const typeDefs = require(path.resolve(__dirname, "../schemas/schema"));

async function startApolloServer(typeDefs) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => ({
      launchAPI: new LaunchAPI(),
      userApi: new UserAPI({ store }),
    }),
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`Server ready on ${server.graphqlPath}`);
}

startApolloServer(typeDefs);
