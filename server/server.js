const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`Server is running on ${server.graphqlPath}`);
}

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  { title: "Czterej pancerni i pies", author: "Janusz Przymanowski" },
  { title: "Przygody Hucka", author: "Mark Twain" },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

startApolloServer(typeDefs, resolvers);
