import { createLogger, format, transports } from "winston";
import path from "path";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`; // ✨ no alignment
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join("logs", "combined.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
  ],
});
