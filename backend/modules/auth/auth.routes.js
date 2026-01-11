import express from "express";
import { login, register } from "./auth.controller.js";
const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", login)
