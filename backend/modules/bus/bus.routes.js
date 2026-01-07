import express from "express";
import { getAllBuses, addBus, updateBus, deleteBus } from "./bus.controller.js";


export const busRoutes = express.Router();

busRoutes.get("/", getAllBuses);
busRoutes.post("/", addBus); // require auth
busRoutes.put("/:id", updateBus); // require auth
busRoutes.delete("/:id", deleteBus); // require auth
