import express from "express";
import {
  getAllUsers,
  getMyUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  setUserName,
  setUserActiveStatus,
  setUserRole
} from "../../controllers/v1/user.js";
import { authenticationGuard, authorizationAdminGuard, authorizationSelfGuard, authorizationSuperAdminGuard } from "../../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.get("/", authenticationGuard, getAllUsers);
userRouter.get("/logout", logoutUser);
userRouter.get("/myself", authenticationGuard, getMyUser);
userRouter.get("/:id", authenticationGuard, getUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.patch("/active-status/:id",authenticationGuard, authorizationAdminGuard, setUserActiveStatus);
userRouter.patch("/role/:id",authenticationGuard,authorizationSuperAdminGuard,setUserRole);
userRouter.patch("/:id", authenticationGuard, authorizationSelfGuard, setUserName);

export default userRouter;
