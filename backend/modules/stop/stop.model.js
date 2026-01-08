import mongoose from "mongoose";

const facilitiesSchema = new mongoose.Schema(
  {
    shelter: { type: Boolean, default: false },
    bench: { type: Boolean, default: false },
    lighting: { type: Boolean, default: false },
    wheelchair_accessible: { type: Boolean, default: false },
    real_time_display: { type: Boolean, default: false },
  },
  { _id: false }
);

const stopSchema = new mongoose.Schema(
  {
    stop_name: {
      type: String,
      required: [true, "Stop name is required"],
      trim: true,
      index: true,
    },
    stop_code: {
      type: String,
      default: "",
      trim: true,
      unique: true,
      sparse: true, // Allows multiple empty strings
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    facilities: {
      type: facilitiesSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    toJSON: { // controlling the returned value by DB
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;

        ret.created_at = doc.createdAt ? doc.createdAt.toISOString() : null;
        ret.updated_at = doc.updatedAt ? doc.updatedAt.toISOString() : null;

        return ret;
      },
    },
  }
);

export const Stop = mongoose.model("Stop", stopSchema);
