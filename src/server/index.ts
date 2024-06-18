import { z } from "zod";
import { procedure, router } from "./trpc";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  getTodos: procedure.query(async () => {
    return [10, 20, 30];
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
