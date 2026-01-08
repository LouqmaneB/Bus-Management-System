import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../utils/logger.js";
import { Route } from "./route.model.js";

/**
 * @desc    Get all routes
 * @route   GET /api/routes
 */
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
  res.json({
    success: true,
    data: routes,
  });
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

/**
 * @desc    Get poular routes
 * @route   GET /api/routes/popular
 */
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
  res.json({
    success: true,
    data: popularRoutes,
  });
});

/**
 * @desc    Add a route
 * @route   POST /api/routes
 */
const addRoute = asyncHandler(async (req, res) => {
  const route = await Route.create(req.body);
  logger.info(`Route added: ${route.name}`);
  res.status(201).json({
    success: true,
    data: route,
    message: `Route added: ${route.name}`,
  });
});

/**
 * @desc    Update a route
 * @route   PUT /api/routes/:id
 */
const updateRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!route) {
    return res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
  logger.info(`Route updated: ${route._id}`);
  res.json({
    success: true,
    data: route,
    message: `Route updated: ${route._id}`,
  });
});

/**
 * @desc    Delete a route
 * @route   DELETE /api/routes/:id
 */
const deleteRoute = asyncHandler(async (req, res) => {
  const route = await Route.findByIdAndDelete(req.params.id);
  if (!route) {
    return res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }
  logger.info(`Route deleted: ${req.params.id}`);
  res.status(204).json({
    success: true,
    message: `Route deleted: ${req.params.id}`,
  });
});

export { getAllRoutes, getPoplarRoutes, addRoute, updateRoute, deleteRoute };
