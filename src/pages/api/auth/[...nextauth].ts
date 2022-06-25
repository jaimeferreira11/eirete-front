import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { AuthService } from '../../../core';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    Credentials({
      name: 'Custom login',
      credentials: {
        username: {
          label: 'Username',
          placeholder: 'Ingrese su usuario',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Inserte su contraseña',
        },
      },
      async authorize(credentials) {
        // Se chechean credenciales
        // Null si no se pasa
        return await AuthService.userLogin({
          username: credentials!.username,
          password: credentials!.password,
        });
      },
    }),
  ],

  // custom pages
  pages: {
    signIn: '/auth/login',
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },

  // Callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
          default:
            break;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accesToken = token.accesToken;
      session.user = token.user as any;

      return session;
    },
  },
});
