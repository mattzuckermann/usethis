import { ApolloServer } from "apollo-server-micro";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";
import connectDb from "../../lib/mongoose";
import results from "../../src/api/results/results.graphql";
import { resultsResolvers } from "../../src/api/results/resolvers";
import { resultsMutations } from "../../src/api/results/mutations";
import users from "../../src/api/users/users.graphql";
import { usersResolvers } from "../../src/api/users/resolvers";
import { usersMutations } from "../../src/api/users/mutations";

const typeDefs = mergeTypeDefs([results, users]);

const resolvers = mergeResolvers([
  resultsResolvers,
  resultsMutations,
  usersResolvers,
  usersMutations,
]);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(server);
