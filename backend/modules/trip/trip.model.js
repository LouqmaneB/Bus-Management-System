import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema(
  {
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    serviceDate: { type: Date, required: true, index: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    tripDurationMinutes: { type: Number, required: true },
    breakMinutes: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["planned", "active", "cancelled"],
      default: "planned",
    },
  },
  { timestamps: true },
);

const tripRunSchema = new mongoose.Schema(
  {
    tripPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TripPlan",
      required: true,
      index: true,
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    driverShifts: [
      {
        _id: false,
        driver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        startTime: String,
        endTime: String,
      },
    ],
    status: {
      type: String,
      enum: ["planned", "active", "completed", "cancelled"],
      default: "planned",
    },
    delayMinutes: { type: Number, default: 0 },
  },
  { timestamps: true },
);
const TripPlan = mongoose.model("TripPlan", tripPlanSchema);
const TripRun = mongoose.model("TripRun", tripRunSchema);
export { TripPlan, TripRun };
