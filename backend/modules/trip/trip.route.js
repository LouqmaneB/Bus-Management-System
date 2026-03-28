import express from "express";
import { createTripPlan, getTripPlans, getTripPlan, getTripRuns, deleteTripPlan } from "./trip.controller.js";

const tripRouter = express.Router();

tripRouter.post("/tripPlans", createTripPlan);
tripRouter.get("/tripPlans", getTripPlans);
tripRouter.delete("/tripPlans/:id", deleteTripPlan);
tripRouter.get("/tripPlans/:id", getTripPlan);
tripRouter.get("/tripRuns", getTripRuns);

export default tripRouter;