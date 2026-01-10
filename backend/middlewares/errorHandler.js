import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    statusCode,
    path: req.originalUrl,
  });

  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
