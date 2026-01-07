import express from "express";
import { addRoute, deleteRoute, getAllRoutes, getPoplarRoutes, updateRoute } from "./route.controller.js";

export const routeRouter = express.Router();

routeRouter.get("/", getAllRoutes);
routeRouter.get("/popular", getPoplarRoutes);
routeRouter.post("/", addRoute);
routeRouter.put("/:id", updateRoute);
routeRouter.delete("/:id", deleteRoute);
