import express from "express";
import 'dotenv/config';

import { connectDB } from "./config/db.js";
import { busRoutes } from "./modules/bus/bus.routes.js";
import { routeRouter } from "./modules/route/route.routes.js";

const app = express();

connectDB();
app.use(express.json());

// Endpoints
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
