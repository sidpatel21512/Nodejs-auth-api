import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth-controller.js';

const authRouter = express.Router();

authRouter.post('/login', loginUser);

authRouter.post("/register", registerUser);

authRouter.get('/logout', logoutUser);

export default authRouter;
