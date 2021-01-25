import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import Users from './users';
import { User } from '../../@types/users';

export const usersResolvers = {
  Query: {
    async user({ _id }: { _id: string }): Promise<User> {
      const user = await Users.findOne({ _id });
      return user;
    },
    async users(): Promise<User[]> {
      const allUsers = await Users.find();
      // @ts-ignore
      return allUsers;
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
