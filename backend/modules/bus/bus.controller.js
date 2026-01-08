import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../utils/logger.js";
import { Bus } from "./bus.model.js";
/**
 * @desc    Get all Bus
 * @route   GET /api/Bus
 */
const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find();
  logger.info("Fetched all buses");
  res.status(200).json({
    success: true,
    data: buses,
  });
});

/**
 * @desc    Add a Bus
 * @route   POST /api/Bus
 */
const addBus = asyncHandler(async (req, res) => {
  const bus = await Bus.create(req.body);
  logger.info(`Bus added: ${bus.plateNumber}`);
  res.status(201).json({
    success: true,
    data: bus,
  });;
});

/**
 * @desc    Update a Bus
 * @route   PUT /api/Bus/:id
 */
const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }
  logger.info(`Bus updated: ${bus._id}`);
  res.json({
    success: true,
    data: bus,
    message: `Bus updated: ${bus._id}`
  });
});

/**
 * @desc    Delete a Bus
 * @route   DELETE /api/Bus
 */
const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);
  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }
  logger.info(`Bus deleted: ${req.params.id}`);
  res.status(204).json({
    success: true,
    message: `Bus deleted: ${req.params.id}`,
  });
});

export { getAllBuses, addBus, updateBus, deleteBus };
