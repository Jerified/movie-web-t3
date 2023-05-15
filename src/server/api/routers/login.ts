import { z } from "zod";
import {hash} from 'bcrypt'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const loginRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ 
      email: z.string(), 
      password: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const hashedPassword = await hash(input.password, 10)
        await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword
          }
        })
      }
      catch (error) {
        console.log(error);
        
      }
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.login.findMany();
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
