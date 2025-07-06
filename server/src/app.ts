import "./sentry.js";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import mongoose from "mongoose";

import type MessageResponse from "./interfaces/message-response.js";

import api from "./api/index.js";
import * as middlewares from "./middlewares.js";
import { setupDailySync } from "./cron/dailySync.js";

import * as Sentry from "@sentry/node";
import { env } from "./env.js";
import { logger } from "./utils/logger.js";

const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "APP - OK",
  });
});

app.use("/api/v1", api);

Sentry.setupExpressErrorHandler(app);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
mongoose
  .connect(env.MONGODB_URI)
  .then(async () => {
    logger.info("DB connected");
    setupDailySync();
  })
  .catch((err) => {
    Sentry.captureException(err);
    logger.error("cannot connect db", err.message);
    process.exit(1);
  });

export default app;
