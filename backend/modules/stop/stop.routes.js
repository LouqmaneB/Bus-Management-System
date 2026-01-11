import express from "express";
import {
  getStops,
  getStopById,
  createStop,
  updateStop,
  deleteStop,
  getNearbyStops,
} from "./stop.controller.js";
import { authorize, protect } from "../../middlewares/auth.middleware.js";

const stopRouter = express.Router();

stopRouter
  .route("/")
  .get(getStops) // get stops
  .post(protect, authorize("admin"), createStop); // add stop

stopRouter.route("/nearby").get(getNearbyStops);

stopRouter
  .route("/:id")
  .get(getStopById) // get specific stop
  .put(protect, authorize("admin"), updateStop) // update specific stop
  .delete(protect, authorize("admin"), deleteStop); // delete specific stop

export default stopRouter;
