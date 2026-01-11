import { asyncHandler } from "../../utils/asyncHandler.js";
import AuthServices from "./auth.service.js";

const authServices = new AuthServices();

/**
 * @desc   register new user
 * @route  POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const user = await authServices.register(req.body);
  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc   Log in
 * @route  POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const user = await authServices.login(req.body);
  res.json({
    success: true,
    data: user,
  });
});

export { register, login };
