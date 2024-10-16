//@ts-nocheck
import { env } from '@expense-management/frontend/config/env';
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { name, email, id, image } = user;
        try {
          const newUser = await fetch(`${env.BASE_URL}/user/google-sign-in`, {
            body: JSON.stringify({
              name,
              email,
              id,
              avatar: image,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (newUser.ok) {
            const { token } = await newUser.json();
            account.access_token = token;
            return true;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.access_token = token.accessToken;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// const handler = (req: NextRequest, res: NextResponse) => {
//   return NextAuth(req, res, authOptions(req, res));
// };
// export default handler;
