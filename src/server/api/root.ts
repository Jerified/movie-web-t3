import { createTRPCRouter } from "~/server/api/trpc";
import { loginRouter } from "./routers/login";
import { signupRouter } from "./routers/signup";
import { bookmarkRouter } from "./routers/bookmark";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  login: loginRouter,
  signup: signupRouter,
  addtoBookmark: bookmarkRouter,
  removefreomBookmark: bookmarkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;