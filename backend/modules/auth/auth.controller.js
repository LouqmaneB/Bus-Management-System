import { asyncHandler } from "../../utils/asyncHandler.js";
import AuthServices from "./auth.service";

const authServices = new AuthServices();

/**
 * @desc   register new user
 * @route  POST /api/register
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
 * @route  POST /api/login
 */
const login = asyncHandler(async (req, res) => {
  const user = await authServices.login(req.body);
  res.json({
    success: true,
    data: user,
  });
});

export { register, login };
