import { logger } from "../../utils/logger.js";
import { Bus } from "./bus.model.js";

export default class BusServices {
  async getAllBuses() {
    const buses = await Bus.find();
    logger.info("Fetched all buses");
    return buses;
  }

  async addBus(payload) {
    const bus = await Bus.create(payload);
    logger.info(`Bus added: ${bus.plateNumber}`);
  }

  async updateById(id, payload) {
    const bus = await Bus.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!bus) {
      const error = new Error("Bus not found");
      error.statusCode = 404;
      throw error;
    }

    logger.info("Bus updated", { id });

    return bus;
  }

  async deleteById(id) {
    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) {
      const error = new Error("Bus not found");
      error.statusCode = 404;
      throw error;
    }
    logger.info(`Bus deleted: ${id}`);
  }
}
