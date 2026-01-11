import express from "express";
import { getAllBuses, addBus, updateBus, deleteBus } from "./bus.controller.js";
import { authorize, protect } from "../../middlewares/auth.middleware.js";

const busRouter = express.Router();

busRouter
  .route("/")
  .get(getAllBuses) //get all bus
  .post(protect, authorize("admin"), addBus); // require auth

busRouter
  .route("/:id")
  .put(protect, authorize("admin"), updateBus) // require auth
  .delete(protect, authorize("admin"), deleteBus); // require auth

export default busRouter;
