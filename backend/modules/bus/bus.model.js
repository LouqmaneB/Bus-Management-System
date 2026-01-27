import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    plateNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "inactive",
    },
    // the driver is not directly affected to bus, cause it can be changed in mid-day
  },
  { timestamps: true }
);

export const Bus = mongoose.model("Bus", busSchema);
