import { logger } from "../../utils/logger.js";
import { Stop } from "./stop.model.js";
import { Route } from "../route/route.model.js";

export default class StopServices {
  async getStops(query) {
    const {
      page = 1,
      limit = 10,
      sort = "created_at",
      order = "desc",
      search = "",
      shelter,
      bench,
      accessible,
    } = query;
    const filter = {};
    if (search) {
      filter.$or = [
        { stop_name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
      ];
    }
    if (shelter === "true") filter["facilities.shelter"] = true;
    if (bench === "true") filter["facilities.bench"] = true;
    if (accessible === "true")
      filter["facilities.wheelchair_accessible"] = true;
    const sortOrder = order === "desc" ? -1 : 1;
    const sortOptions = {};
    sortOptions[sort] = sortOrder;
    const skip = (page - 1) * limit;
    const [stops, total] = await Promise.all([
      Stop.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)),
      Stop.countDocuments(filter),
    ]);

    const stopsWithRoutes = await Promise.all(
      stops.map(async (stop) => {
        const routes = await Route.find({
          stops: { $elemMatch: { stopId: stop._id } },
        }).select("_id routeNumber routeName routeColor");

        return {
          stop,
          routes,
        };
      })
    );

    return {
      stopsWithRoutes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getStopById(id) {
    const stop = await Stop.findById(id);
    if (!stop) {
      const error = new Error("Stop not found");
      error.statusCode = 404;
      throw error;
    }
    const routes = await Route.find({
      stops: { $elemMatch: { stopId: id } },
    }).select("_id routeNumber routeName routeColor");
    return { stop, routes };
  }

  async createStop(payload) {
    const { stop_name, latitude, longitude } = payload;
    if (!stop_name) {
      const error = new Error("Stop name is required");
      error.statusCode = 400;
      throw error;
    }
    if (!latitude || !longitude) {
      const error = new Error("Latitude and longitude are required");
      error.statusCode = 400;
      throw error;
    }
    const stopExists = await Stop.findOne({
      stop_name,
    });
    if (stopExists) {
      const error = new Error("Stop with this name or code already exists");
      error.statusCode = 409;
      throw error;
    }
    const stop = await Stop.create({
      ...payload,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });
    logger.info(`Stop added: ${stop._id}`);
    return stop;
  }

  async updateStopById(id, payload) {
    const stop = await Stop.findById(id);
    if (!stop) {
      const error = new Error("Stop not found");
      error.statusCode = 404;
      throw error;
    }
    const updates = payload;
    // How coordinates are updated
    if (updates.latitude && updates.longitude) {
      updates.location = {
        type: "Point",
        coordinates: [
          parseFloat(updates.longitude),
          parseFloat(updates.latitude),
        ],
      };
      delete updates.latitude;
      delete updates.longitude;
    }
    if (updates.facilities) {
      updates.facilities = {
        ...stop.facilities.toObject(),
        ...updates.facilities, // overwrite the existing facilities
      };
    }
    Object.assign(stop, updates);
    const updatedStop = await stop.save();
    logger.info(`the stop ${id} is updated successfully`);
    return updatedStop;
  }

  async deleteStopById(id) {
    const stop = await Stop.findByIdAndDelete(id);
    if (!stop) {
      const error = new Error("stop not found");
      error.statusCode = 404;
      throw error;
    }
    logger.info(`stop deleted: ${id}`);
  }

  async getNearby(query) {
    const { lat, lng, radius = 5000 } = query;
    if (!lat || !lng) {
      const error = new Error("Latitude and longitude are required");
      error.statusCode = 400;
      throw error;
    }
    const stops = await Stop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    }).limit(50); // Limit results
    return stops;
  }
}
