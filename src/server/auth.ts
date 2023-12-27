import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { compare, hash } from "bcrypt";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { debug } from "util";

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
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const loginSchema = z.object({
  email: z.string().email(), 
  password: z.string().min(4)
})

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  // callbacks: {
  //   jwt: async ({token, user}) => {
  //     if(user) {
  //       token.id = user.id;
  //       token.email = user.email
  //     }
  //   },
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // name: 'google',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: any) => {  
            try {
              const creds = await loginSchema.parseAsync(credentials)

              if (!creds.email || !creds.password) {
                throw new Error ("Email and password required")
              }

              const result = await prisma.user.findFirst({
                where: {
                  email: creds.email
                }
              })
              if (!result || !result.password) {
                console.log('No user found')
                throw new TRPCError({
                  // name: "TRPCError",
                  code: "CONFLICT",
                  message: "No user found"
                })
              }
      
              const password = await compare(creds.password,result.password)
              console.log("user.password", password, creds.password, result.password);
      
              if (!password) {
                console.log("Incorrect password");
                throw new TRPCError({
                  // name: "TRPCError",
                  code: "CONFLICT",
                  message: "Incorrect password"
                })
              }

              return {
                id: result.id,
                email: result.email,
                username: result.username
              }
              
              // const hashedPassword = await hash(input.password, 10)
            //   await prisma.user.create({
            //     data: {
            //       email: credentials?.email,
            //       password: hashedPassword
            //     }
            // })
        } catch(err) {
          console.log(err);
          return null;
        } 
    }
  }) 
    ],
    pages: {
      signIn: '/signin',
      newUser: '/signup'
    },
    secret: env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
  };


/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
// function CredentialProvider(arg0: {}): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

