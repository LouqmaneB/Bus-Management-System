import { comparePassword } from "../../utils/comparePassword.js";
import { generateToken } from "../../utils/generateToken.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { logger } from "../../utils/logger.js";
import { User } from "../user/user.model.js";

export default class AuthServices {
  async register(payload) {
    const { name, email, password } = payload;
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }
    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed });
    logger.info(`User registered: ${email}`);
    return { user, token: generateToken(user) };
  }

  async login(payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await comparePassword(password, user.password))) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    logger.info(`User logged in: ${email}`);
    return { user, token: generateToken(user) };
  }
}
