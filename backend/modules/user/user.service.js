import { logger } from "../../utils/logger.js";
import { User } from "./user.model.js";

export default class UserService {
  async getAllUsers() {
    const users = await User.find();
    logger.info("Fetched all users");
    return users;
  }

  async getUser(id) {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async addUser(payload) {
    const user = await User.create(payload);
    logger.info(`user added: ${user.plateNumber}`);
  }
  async updateUserById(id, payload) {
    const user = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    logger.info("user updated", { id });

    return user;
  }

  async deleteUserById(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    logger.info(`user deleted: ${id}`);
  }
}
