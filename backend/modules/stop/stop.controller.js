import { asyncHandler } from "../../utils/asyncHandler.js";
import StopServices from "./stop.service.js";

const stopServices = new StopServices();

/**
 * @desc    Get all stops
 * @route   GET /api/stops
 */
const getStops = asyncHandler(async (req, res) => {
  const stops = await stopServices.getStops(req.query);
  res.json({
    success: true,
    data: stops
  });
});

/**
 * @desc    Get stop by ID
 * @route   GET /api/stops/:id
 */
const getStopById = asyncHandler(async (req, res) => {
  const stop = await stopServices.getStopById(req.params.id);
  res.json({
    success: true,
    data: stop,
  });
});

/**
 * @desc    Create a new stop
 * @route   POST /api/stops
 */
const createStop = asyncHandler(async (req, res) => {
  const stop = await stopServices.createStop(req.body);
  res.status(201).json({
    success: true,
    data: stop,
  });
});

/**
 * @desc    Update a stop
 * @route   PUT /api/stops/:id
 */
const updateStop = asyncHandler(async (req, res) => {
  const stop = await stopServices.updateStopById(req.params.id, req.body);
  res.json({
    success: true,
    data: stop,
  });
});

/**
 * @desc    Delete a stop
 * @route   DELETE /api/stops/:id
 */
const deleteStop = asyncHandler(async (req, res) => {
  await stopServices.deleteStopById(req.params.id);
  res.status(204).send();
});

/**
 * @desc    Get stops within radius(m)
 * @route   GET /api/stops/nearby
 */
const getNearbyStops = asyncHandler(async (req, res) => {
  const stops = await stopServices.getNearby(req.query);
  res.json({
    success: true,
    data: { stops, count: stops.length },
  });
});

export {
  getStops,
  getStopById,
  createStop,
  updateStop,
  deleteStop,
  getNearbyStops,
};
