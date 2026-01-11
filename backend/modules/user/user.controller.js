import { asyncHandler } from "../../utils/asyncHandler.js";
import UserService from "./user.service.js";

const userServices = new UserService();

/**
 * @desc  get all users
 * @route  GET /api/users
 * @access  Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userServices.getAllUsers();
  res.json({
    success: true,
    data: users,
  });
});

/**
 * @desc  get a user by id
 * @route  GET /api/users/:id
 * @access  Admin
 */
const getUser = asyncHandler(async (req, res) => {
  const users = await userServices.getUser(req.params.id);
  res.json({
    success: true,
    data: users,
  });
});

/**
 * @desc    Add a user
 * @route   POST /api/users
 * @access  Admin
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
 * @access  Admin
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
 * @access  Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  await userServices.deleteUserById(req.params.id);
  res.status(204).send();
});

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
