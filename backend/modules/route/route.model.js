import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    routeNumber: { type: String, required: true, unique: true },
    routeName: { type: String, required: true },
    description: String,
    stops: [
      {
        stopId: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
        order: Number,
        arrivalTime: String,
        departureTime: String,
      },
    ],
    frequency: {
      peak: Number,
      offPeak: Number,
    },
    operatingHours: {
      start: String,
      end: String,
    },
    routeColor: { type: String, default: "#4f46e5" },
    fare: Number,
  },
  { timestamps: true }
);

export const Route = mongoose.model("Route", routeSchema);
