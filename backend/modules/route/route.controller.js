import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../utils/logger.js";
import { Route } from "./route.model.js";

const getAllRoutes = asyncHandler(async (req, res) => {
  const routes = await Route.aggregate([
    {
      $lookup: {
        from: "stops",
        localField: "points.stop_id",
        foreignField: "_id",
        as: "stops",
      },
    },
  ]);
  logger.info("Fetched all routes");
  res.json(routes);
});

// const searchRoutes = asyncHandler(async (req, res) => {
//   if (req.query.search) {
//     const searchQuery = req.query.search;
//     const regex = new RegExp(searchQuery, "i");
//     const matchedRouteIds = await Route.aggregate([
//       {
//         $lookup: {
//           from: "stops",
//           localField: "points.stop_id",
//           foreignField: "_id",
//           as: "points",
//         },
//       },
//       {
//         $match: {
//           $or: [
//             { route_name: { $regex: regex } },
//             { short_name: { $regex: regex } },
//             { description: { $regex: regex } },
//           ],
//         },
//       },
//       { $project: { _id: 1 } },
//     ]);

//     const routeIds = matchedRouteIds.map((r) => r._id);

//     const routes = await Route.aggregate([
//       {
//         $match: { _id: { $in: routeIds } },
//       },
//       {
//         $lookup: {
//           from: "stops",
//           localField: "points.stop_id",
//           foreignField: "_id",
//           as: "stops",
//         },
//       },
//     ]);

//     logger.info(`Fetched ${routes.length} routes matching search query`);
//     return res.json(routes);
//   }
// });

const getPoplarRoutes = asyncHandler(async (req, res) => {
  const popularRoutes = await Route.aggregate([
    {
      $lookup: {
        from: "stops",
        localField: "points.stop_id",
        foreignField: "_id",
        as: "stops",
      },
    },
    { $sort: { frequency_minutes: 1 } },
    { $limit: 6 },
  ]);
  logger.info("Fetched popular routes");
  res.json(popularRoutes);
});

const addRoute = asyncHandler(async (req, res) => {
  const route = await Route.create(req.body);
  logger.info(`Route added: ${route.name}`);
  res.status(201).json(route);
});

const updateRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!route) {
    res.status(404);
    throw new Error("Route not found");
  }
  logger.info(`Route updated: ${route._id}`);
  res.json(route);
});

const deleteRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndDelete(req.params.id);
  if (!route) {
    res.status(404);
    throw new Error("Route not found");
  }
  logger.info(`Route deleted: ${req.params.id}`);
  res.status(204).end();
});

export { getAllRoutes, getPoplarRoutes, addRoute, updateRoute, deleteRoute };
