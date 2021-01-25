import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../../../src/api/users/users';
import bcrypt from 'bcrypt';

const options = {
  site: process.env.NEXTAUTH_URL,
  database: process.env.MONGO_URL,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/welcome',
  },
  callbacks: {
    redirect: async (url: string) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/');
      } else {
        return Promise.resolve('/');
      }
    },
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password: plaintextPassword } = credentials;
        const user = await Users.findOne({ email });
        if (user) {
          const { password: hash } = user;
          const passwordIsMatch = await bcrypt.compare(plaintextPassword, hash);
          if (!passwordIsMatch) {
            console.error('Failed');
            return Promise.resolve(null);
          } else {
            console.log('Logged in');
            return Promise.resolve(user);
          }
        } else {
          console.error('Failed');
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);
