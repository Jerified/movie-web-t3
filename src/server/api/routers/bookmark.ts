import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";

export const bookmarkRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ 
      movieId: z.number(),
      imdb_id: z.string(),
      original_title: z.string(),
      adult: z.boolean(),
      backdrop_path: z.string(),
      media_type: z.string(),
      original_language: z.string(),
      overview: z.string(),
      poster_path: z.string(),
      title: z.string(),
      release_date: z.string(),
      vote_average: z.number(),
      vote_count: z.number(),
      runtime: z.number()
    }))
    // .query(async () => {

    // }),
    .mutation(async ({ ctx, input }) => {
      try {
        // console.log(ctx.session.user.);
        const id = ctx.session.user.id
        const existingbookmark = await prisma.movie.findUnique({
          where: {
            movieId_userId: {
              movieId: input.movieId,
              userId: id
            }
          }
        })

          if(existingbookmark) {
            await prisma.movie.delete({
              where: {
                id: existingbookmark.id
              }
            })
            return {success: true}
          } else {
            await prisma.movie.create({
              data: {
                movieId: input.movieId,
                userId: id,
                media_type: input.media_type,
              }
            })
            return {success: true}
          }

        
        // if(!existingbookmark) {
        //   console.log(`User ${ctx.session.user.email} not found`);
        //   throw new Error(`User ${ctx.session.user.email} not found`)
        // } 

         const newWatchlistItem = await ctx.prisma.movie.create({
          data: {
            imdb_id: input.imdb_id,
            original_title: input.original_title,
            adult: input.adult, 
            backdrop_path: input.backdrop_path,
            media_type: input.media_type,
            original_language:input.original_language,
            overview: input.overview,
            poster_path: input.poster_path,
            title: input.title,
            release_date: input.release_date,
            vote_average: input.vote_average,
            vote_count: input.vote_count,
            runtime: input.runtime,
            userId: ctx.session.user.id
          },
            // include: {
            //   favorites: true
            // }
          // include: {watchlisters: true}
        })

        return newWatchlistItem
      }
      catch (error) {
        console.log(error);
        // throw new Error(error)
      }
    }),
    removefromBookmark: protectedProcedure
    .input(z.object({ 
      movieId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // console.log(ctx.session.user.);
        
        const existingbookmark = await prisma.movie.findUnique({
            where: {
              // userId_movieId: {movieId, userId}
              id: ctx.session.user.id
            }
        })
        if(!existingbookmark) {
          if(!existingbookmark) {
            console.log(`Users ${ctx.session.user.email} not found`);
            throw new Error(`User ${ctx.session.user.email} not found`)
          } 
          // console.log('movie is not in watchlist');
          // throw new Error('Invalid ID')
          
        } 

        const removeBookmark = await prisma.movie.delete({
          where: {
            id: ctx.session.user.id
          }
        })

        return 'Movie removed to bookmark'
      }
      catch (error) {
        console.log(error);
        // throw new Error(error)
      }
    }),

  // getSecretMessage: protectedProcedure.mutation(() => {
  //   return "you can now see this secret message!";
  // }),
});