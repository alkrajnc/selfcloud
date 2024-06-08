/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
// import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

// import { env } from "@/env";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { pbkdf2Sync } from "crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      access_token: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    username: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.name = user.username;
      }
      return token;
    },
    async session({ session }) {
      return { ...session };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 24 * 60 * 60, // 24 hours
    /* generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },  */
  },
  // adapter: DrizzleAdapter(db, createTable) as Adapter,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials!.email))
          .limit(1);
        if (user.length === 0) {
          return null;
        }
        const hash = pbkdf2Sync(
          credentials?.password!,
          user[0]?.salt!,
          10000,
          64,
          "sha512",
        ).toString("hex");
        if (hash === user[0]?.password) {
          return user[0];
        }

        return null;
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
