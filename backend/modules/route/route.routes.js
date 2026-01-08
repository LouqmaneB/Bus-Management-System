import express from "express";
import {
  addRoute,
  deleteRoute,
  getAllRoutes,
  getPoplarRoutes,
  updateRoute,
} from "./route.controller.js";

const routeRouter = express.Router();

routeRouter
  .route("/")
  .get(getAllRoutes) // get all routes
  .post(addRoute); // add route

routeRouter.get("/popular", getPoplarRoutes);

routeRouter
  .route("/:id")
  .put(updateRoute) // update a route by id
  .delete(deleteRoute); // delete route by id

export default routeRouter;
