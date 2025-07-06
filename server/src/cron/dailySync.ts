import * as Sentry from "@sentry/node";
import cron from "node-cron";
import { syncOrders } from "../services/syncService";
import { cleanupOldOrders } from "../services/cleanUpService";
import { logger } from "../utils/logger";

export const setupDailySync = () => {
  cron.schedule("0 12 * * *", async () => {
    logger.info("Running daily sync at 12PM");
    try {
      logger.info("Starting syncing orders");
      await syncOrders();
      logger.info("End syncing orders");
    } catch (err) {
      logger.error("syncOrders failed", err);
      Sentry.captureException(err);
    }

    try {
      logger.info("Starting cleaning orders");
      await cleanupOldOrders();
      logger.info("End cleaning orders");
    } catch (err) {
      logger.error("cleanupOldOrders failed", err);
      Sentry.captureException(err);
    }
  });
};
