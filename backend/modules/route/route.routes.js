import express from "express";
import {
  addRoute,
  deleteRoute,
  getAllRoutes,
  getPoplarRoutes,
  updateRoute,
} from "./route.controller.js";
import { authorize, protect } from "../../middlewares/auth.middleware.js";

const routeRouter = express.Router();

routeRouter
  .route("/")
  .get(getAllRoutes) // get all routes
  .post(protect, authorize("admin"), addRoute); // add route

routeRouter.get("/popular", getPoplarRoutes);

routeRouter
  .route("/:id")
  .put(protect, authorize("admin"), updateRoute) // update a route by id
  .delete(protect, authorize("admin"), deleteRoute); // delete route by id

export default routeRouter;
