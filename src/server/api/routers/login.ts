// import { z } from "zod";
// import {compare, hash} from 'bcrypt'

// import {
//   createTRPCRouter,
//   publicProcedure,
//   protectedProcedure,
// } from "~/server/api/trpc";
// // import { signIn, signOut, useSession } from "next-auth/react";

// // const { data: session } = useSession()
// // console.log(session);

// export const loginRouter = createTRPCRouter({
 
//   adds: publicProcedure
//     .input(z.object({ 
//       email: z.string(), 
//       password: z.string()
//     }))// getAll: publicProcedure.query(({ ctx }) => {
//       //   return ctx.prisma.login.findMany();
//       // }),
//     .mutation(async ({ ctx, input }) => {
//       try {
//         // if(!input.email || !input.password) {
//         //   return 
//         // }
//         const user = await ctx.prisma.user.findFirst({
//           where: {
//             email: input.email
//           }
//         })
//         if (user) {
//           return  console.log('no user found')
//         }

//         const password = await compare(input.password, user.password)

//         if (!password) {
//           return console.log('Invalid password')   
//         }
        
//         // const hashedPassword = await hash(input.password, 10)
//         // await ctx.prisma.user.create({
//         //   data: {
//         //     email: input.email,
//         //     password: hashedPassword
//         //   }
//         // })
//         // // return data
//       }
//       catch (error) {
//         console.log(error);
        
//       }
//     }),


//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
