import Users from './users';
import { User } from '../../@types/users';

export const usersMutations = {
  Mutation: {
    async addUser(
      _: null,
      {
        user,
      }: {
        user: {
          _id: string;
          name: string;
          email: string;
          image: string;
          createdAt: Date;
          updatedAt: Date;
        };
      }
    ): Promise<User | undefined> {
      try {
        const newUser = await Users.create(user);
        await console.log(`
====================
Added User ${user.name}
====================
`);
        return newUser;
      } catch (err) {
        console.log(err);
      }
    },
    async removeUser(
      _: null,
      { email }: { email: string }
    ): Promise<User | undefined> {
      try {
        const deletedUser = (await Users.findOne({ email })) || {
          _id: "user doesn't exist",
          name: "user doesn't exist",
          email: "user doesn't exist",
          image: "user doesn't exist",
        };
        if (deletedUser) {
          await Users.deleteOne({ email });
          console.log(`
========================================
Deleted User ${email}
========================================
`);
        }
        return deletedUser;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
