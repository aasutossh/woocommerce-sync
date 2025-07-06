import * as Sentry from "@sentry/node";
import { env } from "./env.js";
import { logger } from "./utils/logger.js";

if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
  });
} else {
  logger.error("SENTRY_DSN not found in env");
}
