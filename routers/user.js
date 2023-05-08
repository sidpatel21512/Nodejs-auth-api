import express from "express";
import {
  getMyUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.js";
import { authenticationGuard } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/myself", authenticationGuard, getMyUser);
userRouter.get("/:id", authenticationGuard, getUser);
userRouter.patch("/:id", authenticationGuard, updateUser);

export default userRouter;
