import express from "express";
import {
  getAllUsers,
  getMyUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../../controllers/v1/user.js";
import { authenticationGuard } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.get("/",authenticationGuard, getAllUsers);
userRouter.get("/logout", logoutUser);
userRouter.get("/myself", authenticationGuard, getMyUser);
userRouter.get("/:id", authenticationGuard, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:id", authenticationGuard, updateUser);

export default userRouter;
