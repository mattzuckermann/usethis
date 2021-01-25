import Users from './users';
import { User } from '../../@types/users';
import bcrypt from 'bcrypt';

type UserInput = {
  name: string;
  email: string;
  password: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const usersMutations = {
  Mutation: {
    async addUser(
      _: null,
      {
        user,
      }: {
        user: UserInput;
      }
    ): Promise<void> {
      try {
        const saltRounds = 10;
        const myPlaintextPassword = user.password;
        bcrypt.genSalt(saltRounds, (err, salt) => {
          if (err) {
            console.log(err);
          } else {
            bcrypt.hash(myPlaintextPassword, salt, async (err, hash) => {
              if (err) {
                console.error(err);
              } else {
                user.password = hash;
                // @ts-ignore
                await Users.create(user);
              }
            });
          }
        });
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
