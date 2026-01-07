import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../utils/logger.js";
import { Bus } from "./bus.model.js";


const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find();
  logger.info("Fetched all buses");
  res.json(buses);
});

const addBus = asyncHandler(async (req, res) => {
  const bus = await Bus.create(req.body);
  logger.info(`Bus added: ${bus.plateNumber}`);
  res.status(201).json(bus);
});

const updateBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }
  logger.info(`Bus updated: ${bus._id}`);
  res.json(bus);
});

const deleteBus = asyncHandler(async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);
  if (!bus) {
    res.status(404);
    throw new Error("Bus not found");
  }
  logger.info(`Bus deleted: ${req.params.id}`);
  res.status(204).end();
});

export { getAllBuses, addBus, updateBus, deleteBus };
