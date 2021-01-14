import { ApolloServer } from 'apollo-server-micro';
import { mergeResolvers, mergeTypeDefs } from 'graphql-tools';
import connectDb from '../../lib/mongoose';

// Users Schema
import users from '../../src/api/users/users.graphql';
import { usersResolvers } from '../../src/api/users/resolvers';
import { usersMutations } from '../../src/api/users/mutations';
// Problems Schema
import problems from '../../src/api/problems/problems.graphql';
import { problemsResolvers } from '../../src/api/problems/resolvers';
import { problemsMutations } from '../../src/api/problems/mutations';
// Quizzes Schema
import quizzes from '../../src/api/quizzes/quizzes.graphql';
import { quizzesResolvers } from '../../src/api/quizzes/resolvers';
import { quizzesMutations } from '../../src/api/quizzes/mutations';
// Results Schema
import results from '../../src/api/results/results.graphql';
import { resultsResolvers } from '../../src/api/results/resolvers';
import { resultsMutations } from '../../src/api/results/mutations';

// Merging typeDefs
const typeDefs = mergeTypeDefs([users, quizzes, problems, results]);

// Merging resolvers
const resolvers = mergeResolvers([
  usersResolvers,
  usersMutations,
  quizzesResolvers,
  quizzesMutations,
  problemsResolvers,
  problemsMutations,
  resultsResolvers,
  resultsMutations,
]);

// Initializing Apollo Server with GraphQL typeDefs and resolvers
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Adding bodyParser api config for GraphQL playground
export const config = {
  api: {
    bodyParser: false,
  },
};

// * Assigning and exporting GraphQL API to end point [URL]/api/graphql
const server = apolloServer.createHandler({ path: '/api/graphql' });
export default connectDb(server);
