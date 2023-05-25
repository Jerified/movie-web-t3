import { createTRPCRouter } from "~/server/api/trpc";
import { loginRouter } from "~/server/api/routers/login";
import { signupRouter } from "./routers/signup";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  login: loginRouter,
  signup: signupRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;