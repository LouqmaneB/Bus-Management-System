import { asyncHandler } from "../../utils/asyncHandler.js";
import UserService from "./user.service.js";

const userServices = new UserService();

/**
 * @desc  get all users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = userServices.getAllUsers();
  res.json({
    success: true,
    data: users,
  });
});

/**
 * @desc  get a user by id
 */
const getUser = asyncHandler(async (req, res) => {
  const users = userServices.getUser(req.params.id);
  res.json({
    success: true,
    data: users,
  });
});

/**
 * @desc    Add a user
 * @route   POST /api/users
 */
const addUser = asyncHandler(async (req, res) => {
  const user = await userServices.addUser(req.body);
  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update a user
 * @route   PUT /api/users/:id
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await userServices.updateUserById(req.params.id, req.body);
  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 */
const deleteUser = asyncHandler(async (req, res) => {
  await userServices.deleteUserById(req.params.id);
  res.status(204).send();
});

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
