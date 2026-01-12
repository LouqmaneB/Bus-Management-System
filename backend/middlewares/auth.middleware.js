import jwt from "jsonwebtoken";
import { User } from "../modules/user/user.model.js";
import { logger } from "../utils/logger.js";

/**
 *@desc  Protect routes
 */
export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("Not authorized, token missing");
      error.statusCode = 401;
      logger.error(error.message, {
        statusCode: error.statusCode,
        path: req.originalUrl,
      });
      throw error;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const error = new Error("Not authorized, user not found");
      error.statusCode = 401;
      logger.error(error.message, {
        statusCode: error.statusCode,
        path: req.originalUrl,
      });
      throw error;
    }

    req.user = user;
    next();
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err);
  }
};

/**
 *@desc  Access by role
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const error = new Error("Access denied");
      error.statusCode = 403;
      throw error;
    }
    next();
  };
};
