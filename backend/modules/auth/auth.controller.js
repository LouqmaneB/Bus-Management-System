import { asyncHandler } from "../../utils/asyncHandler.js";
import AuthServices from "./auth.service";


const authServices = new AuthServices()

const register = asyncHandler(async (req, res) => {
  await authServices.register(req.body)
})

const login = asyncHandler(async (req, res) => {
  await authServices.login(req.body)
})

export { register, login }