import { asyncHandler } from "../../utils/asyncHandler.js";
import { logger } from "../../utils/logger.js";
import { Stop } from "./stop.model.js";

/**
 * @desc    Get all stops
 * @route   GET /api/stops
 */
const getStops = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "desc",
    search = "",
    shelter,
    bench,
    accessible,
  } = req.query;

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
  if (accessible === "true") filter["facilities.wheelchair_accessible"] = true;

  const sortOrder = order === "desc" ? -1 : 1;
  const sortOptions = {};
  sortOptions[sort] = sortOrder;

  const skip = (page - 1) * limit;

  const [stops, total] = await Promise.all([
    Stop.find(filter).sort(sortOptions).skip(skip).limit(parseInt(limit)),
    Stop.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: stops,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

/**
 * @desc    Get stop by ID
 * @route   GET /api/stops/:id
 */
const getStopById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // to be a middleware in futur
    return res.status(400).json({
      success: false,
      message: "Invalid stop ID format",
    });
  }

  const stop = await Stop.findById(id);
  if (!stop) {
    return res.status(404).json({
      success: false,
      message: "Stop not found",
    });
  }

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
  const {
    stop_name,
    stop_code,
    latitude,
    longitude,
    address,
    description,
    facilities,
  } = req.body;

  if (!stop_name) {
    return res
      .status(400)
      .json({ success: false, message: "Stop name is required" });
  }

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ success: false, message: "Latitude and longitude are required" });
  }

  const stopExists = await Stop.findOne({
    stop_name,
  });

  if (stopExists) {
    return res.status(400).json({
      success: false,
      message: "Stop with this name or code already exists",
    });
  }

  const stop = await Stop.create({
    stop_name,
    stop_code: stop_code || "",
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    },
    address: address || "",
    description: description || "",
    facilities: {
      shelter: facilities?.shelter || false,
      bench: facilities?.bench || false,
      lighting: facilities?.lighting || false,
      wheelchair_accessible: facilities?.wheelchair_accessible || false,
      real_time_display: facilities?.real_time_display || false,
    },
  });

  logger.info(`Stop added: ${stop._id}`);

  res.status(201).json({
    success: true,
    data: stop,
    message: "Stop created successfully",
  });
});

/**
 * @desc    Update a stop
 * @route   PUT /api/stops/:id
 */
const updateStop = asyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);

  if (!stop) {
    return res.status(404).json({ success: false, message: "Stop not found" });
  }

  const updates = req.body;

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

  logger.info(`the stop ${req.params.id} is updated successfully`);

  res.json({
    success: true,
    data: updatedStop,
    message: "Stop updated successfully",
  });
});

/**
 * @desc    Delete a stop
 * @route   DELETE /api/stops/:id
 */
const deleteStop = asyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);

  if (!stop) {
    return res.status(404).json({ success: false, message: "Stop not found" });
  }

  await stop.deleteOne();

  res.json({
    success: true,
    message: "Stop deleted successfully",
  });
});

/**
 * @desc    Get stops within radius(m)
 * @route   GET /api/stops/nearby
 */
const getNearbyStops = asyncHandler(async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      message: "Latitude and longitude are required",
    });
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

  res.json({
    success: true,
    data: stops,
    count: stops.length,
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
