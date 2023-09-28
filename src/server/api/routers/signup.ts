import { z } from "zod";
import { hash } from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const signupRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findFirst({
          where: {
            email: input.email,
          },
        });
        if (user) {
          console.log("user already exists...");
          // return console.log('user already exists...');

          throw new TRPCError({
            // name: "TRPCError",
            code: "CONFLICT",
            message: "User already exists...",
          });
        }
        const hashedPassword = await hash(input.password, 12);
        const newUser = await ctx.prisma.user.create({
          data: {
            username: input.username,
            email: input.email,
            password: hashedPassword,
          },
        });
        console.log(newUser);
        return {
          status: 201,
          message: "Áccount created successfully",
          result: newUser.email,
        };
      } catch (error) {
        console.log(error);
        // throw new Error(error)
      }
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
