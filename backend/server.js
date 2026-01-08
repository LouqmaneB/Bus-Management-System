import express from "express";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import busRouter from "./modules/bus/bus.routes.js";
import routeRouter from "./modules/route/route.routes.js";
import stopRouter from "./modules/stop/stop.routes.js";

const app = express();

connectDB();
app.use(express.json());

// Endpoints
app.use("/api/buses", busRouter);
app.use("/api/routes", routeRouter);
app.use("/api/stops", stopRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
