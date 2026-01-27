import asyncHandler from "express-async-handler";
import TripService from "../services/tripPlanService.js";
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
 * @desc Get all trip runs (optionally filter by date)
 * @route GET /api/tripRuns
 * @access Public / Admin
 */
export const getTripRuns = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const result = await tripService.getTripRunsService(date);
  res.json({ success: true, data: result });
});
