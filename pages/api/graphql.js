import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    getThis: String
  }
`;

const resolvers = {
  Query: {
    getThis: () => {
      return "useThis";
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
