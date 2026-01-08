import express from "express";
import { getAllBuses, addBus, updateBus, deleteBus } from "./bus.controller.js";

const busRouter = express.Router();

busRouter
  .route("/")
  .get(getAllBuses) //get all bus
  .post(addBus); // require auth

busRouter
  .route("/:id")
  .put(updateBus) // require auth
  .delete(deleteBus); // require auth

export default busRouter;
