import { z } from "zod";
import { procedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "@/db/schema";

const connectionString = process.env.DATABASE_URL ?? "";
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);
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
  allUsers: procedure.query(async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
