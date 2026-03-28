import { asyncHandler } from "../../utils/asyncHandler.js";
import TripService from "./trip.service.js";
const tripService = new TripService();
/**
 * @desc    Create a trip plan and generate daily trips
 * @route   POST /api/tripPlans
 * @access  Public / Admin
 */
export const createTripPlan = asyncHandler(async (req, res) => {
  const result = await tripService.createTripPlanService(req.body);
  res.status(201).json({ success: true, data: result });
});

/**
 * @desc    Get all trip plans
 * @route   GET /api/tripPlans
 * @access  Public / Admin
 */
export const getTripPlans = asyncHandler(async (_req, res) => {
  const result = await tripService.getTripPlansService();
  res.json({ success: true, data: result });
});

/**
 * @desc    Get trip plan by id
 * @route   GET /api/tripPlan/:id
 * @access  Public / Admin
 */
export const getTripPlan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await tripService.getTripPlanService(id);
  res.json({ success: true, data: result });
});

/**
 * @desc Get all trip runs (optionally filter by date)
 * @route GET /api/tripRuns
 * @access Public / Admin
 */
export const getTripRuns = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const result = await tripService.getTripRunsService(date);
  res.json({ success: true, data: result });
});

/**
 * @desc Delete a trip run
 * @route DELETE /api/tripRuns/:id
 * @access Public / Admin
 */
export const deleteTripRun = asyncHandler(async (req, res) => {
  await tripService.deleteTripRun(req.params.id);
  res.status(204).send();
});
/**
 * @desc Delete a trip plan
 * @route Delete /api/trips/tripPlans/:id
 * @access Public / Admin
 */
export const deleteTripPlan = asyncHandler(async (req, res) => {
  await tripService.deleteTripPlan(req.params.id);
  res.status(204).send();
});
