import express from "express";
import { createTripPlan, getTripPlans, getTripRuns } from "../controllers/tripPlanController.js";

const router = express.Router();

router.post("/tripPlans", createTripPlan);
router.get("/tripPlans", getTripPlans);
router.get("/tripRuns", getTripRuns);

export default router;