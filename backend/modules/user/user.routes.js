import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .get(getAllUsers) // get all users
  .post(addUser); // add new user

userRouter
  .route("/:id")
  .get(getUser) // get a user by id
  .put(updateUser) // update user by id
  .delete(deleteUser); // delete user by id

export default userRouter;
