import { asyncHandler } from "../../utils/asyncHandler.js";
import RouteServices from "./route.service.js";

const routeServices = new RouteServices();

/**
 * @desc    Get a route by id
 * @route   GET /api/routes/:id
 * @access  Public
 */
const getRouteById = asyncHandler(async (req, res) => {
  const route = await routeServices.getRouteById(req.params.id);
  res.json({
    success: true,
    data: route,
  });
});

/**
 * @desc    Get all routes
 * @route   GET /api/routes
 * @access  Public
 */
const getAllRoutes = asyncHandler(async (req, res) => {
  const routes = await routeServices.getAllRoutes();
  res.json({
    success: true,
    data: routes,
  });
});

/**
 * @desc    Get poular routes
 * @route   GET /api/routes/popular
 * @access  Public
 */
const getPoplarRoutes = asyncHandler(async (req, res) => {
  const popularRoutes = await routeServices.getPopularRoutes();
  res.json({
    success: true,
    data: popularRoutes,
  });
});

/**
 * @desc    Add a route
 * @route   POST /api/routes
 * @access  Admin
 */
const addRoute = asyncHandler(async (req, res) => {
  const route = await routeServices.addRoute(req.body);
  res.status(201).json({
    success: true,
    data: route,
  });
});

/**
 * @desc    Update a route
 * @route   PUT /api/routes/:id
 * @access  Admin
 */
const updateRoute = asyncHandler(async (req, res) => {
  const route = await routeServices.updateRouteById(req.params.id, req.body);
  res.json({
    success: true,
    data: route,
  });
});

/**
 * @desc    Delete a route
 * @route   DELETE /api/routes/:id
 * @access  Admin
 */
const deleteRoute = asyncHandler(async (req, res) => {
  await routeServices.deleteRouteById(req.params.id);
  res.status(204).send();
});

export { getAllRoutes, getRouteById, getPoplarRoutes, addRoute, updateRoute, deleteRoute };
