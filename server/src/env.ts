import { z } from "zod/v4";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),

  MONGODB_URI: z.string(),
  WOOCOMMERCE_STORE_URL: z.url(),
  WOOCOMMERCE_CONSUMER_KEY: z.string(),
  WOOCOMMERCE_CONSUMER_SECRET: z.string(),
  SENTRY_DSN: z.url().default(""),
  SYNC_ORDER_WHEN_BOOT: z.coerce.boolean().default(false),
  ORDER_LOOKBACK_DAYS: z.coerce.number().default(30),
  ORDER_DELETION_THRESHOLD_DAYS: z.coerce.number().default(90),
});

try {
  // eslint-disable-next-line node/no-process-env
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(
      "Missing environment variables:",
      error.issues.flatMap((issue) => issue.path),
    );
  } else {
    console.error(error);
  }
  process.exit(1);
}

// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);
