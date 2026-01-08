import express from "express";
import {
  getStops,
  getStopById,
  createStop,
  updateStop,
  deleteStop,
  getNearbyStops,
} from "./stop.controller.js";

const stopRouter = express.Router();

stopRouter
  .route("/")
  .get(getStops) // get stops
  .post(createStop); // add stop

stopRouter.route("/nearby").get(getNearbyStops);

stopRouter
  .route("/:id")
  .get(getStopById) // get specific stop
  .put(updateStop) // update specific stop
  .delete(deleteStop); // delete specific stop

export default stopRouter;
