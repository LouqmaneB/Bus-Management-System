import { asyncHandler } from "../../utils/asyncHandler.js";
import BusServices from "./bus.service.js";

const busServices = new BusServices();

/**
 * @desc    Get all Bus
 * @route   GET /api/Bus
 */
const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await busServices.getAllBuses();
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
  const bus = busServices.addBus(req.body);
  res.status(201).json({
    success: true,
    data: bus,
  });
});

/**
 * @desc    Update a Bus
 * @route   PUT /api/Bus/:id
 */
const updateBus = asyncHandler(async (req, res) => {
  const bus = await busServices.updateById(req.params.id, req.body);
  res.status(200).json({
    success: true,
    data: bus,
  });
});

/**
 * @desc    Delete a Bus
 * @route   DELETE /api/Bus
 */
const deleteBus = asyncHandler(async (req, res) => {
  await busServices.deleteById(req.params.id);
  res.status(204).send();
});

export { getAllBuses, addBus, updateBus, deleteBus };
