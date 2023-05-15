import { z } from "zod";
import {hash} from 'bcrypt'

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const signupRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ 
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(), 
      password: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const hashedPassword = await hash(input.password, 10)
        await ctx.prisma.user.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashedPassword
          }
        })
      }
      catch (error) {
        console.log(error);
        
      }
    }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
