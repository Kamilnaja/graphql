const { ApolloServer, gql } = require("apollo-server");

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

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then((serverInfo) => console.log(`🚀 Server running at ${serverInfo.url}`));
