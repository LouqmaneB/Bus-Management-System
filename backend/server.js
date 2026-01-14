import express from "express";
import "dotenv/config";
import cors from 'cors'

import { connectDB } from "./config/db.js";
import busRouter from "./modules/bus/bus.routes.js";
import routeRouter from "./modules/route/route.routes.js";
import stopRouter from "./modules/stop/stop.routes.js";
import userRouter from "./modules/user/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

connectDB();
app.use(express.json());

// Authentification
app.use("/api/auth", authRoutes)

// Endpoints
app.use("/api/buses", busRouter);
app.use("/api/routes", routeRouter);
app.use("/api/stops", stopRouter);
app.use("/api/users", userRouter);

app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
