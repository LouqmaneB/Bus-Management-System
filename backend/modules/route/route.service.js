import { logger } from "../../utils/logger.js";
import { Route } from "./route.model.js";

export default class RouteServices {
  async getAllRoutes() {
    const routes = await Route.find()
    logger.info("Fetched all routes");
    return routes;
  }

  async getPopularRoutes() {
    const routes = await Route.find();
    logger.info("Fetched popular routes");
    return routes;
  }

  async addRoute(payload) {
    const route = Route.create(payload);
    logger.info(`Route added: ${route.name}`);
    return route;
  }

  async updateRouteById(id, payload) {
    const route = await Route.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!route) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }
    logger.info(`Route updated: ${route._id}`);
    return route;
  }

  async deleteRouteById(id) {
    const route = await Route.findByIdAndDelete(id);
    if (!route) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }
    logger.info(`Route deleted: ${id}`);
  }
}
