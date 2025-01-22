import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_ID: z.string().min(1),
    PRIVATE_KEY: z.string().min(1),
    WEBHOOK_SECRET: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    OPEN_AI_API_KEY: z.string().min(1),
    CLERK_WEBHOOK_SIGNING: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   APP_ID: process.env.APP_ID,
  //   PRIVATE_KEY: process.env.PRIVATE_KEY,
  //   WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  //   CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  //   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
  //     process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  // },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});
