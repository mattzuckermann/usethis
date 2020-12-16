import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from './users';
import { User } from '../../@types/schema';

export const usersResolvers = {
  Query: {
    async user({ _id }: { _id: string }): Promise<User> {
      const user = await Users.findOne({ _id });
      return user;
    },
    async users(): Promise<User[]> {
      const allUsers = await Users.find();
      return allUsers;
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
