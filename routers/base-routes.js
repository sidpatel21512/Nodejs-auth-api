import express from 'express';
import { redirectToProfile, renderLogin, renderProfile, renderRegister } from '../controllers/routing-controller.js';
import { isAuthenticated } from '../middleware.js';

const baseRouter = express.Router();

baseRouter.get('/register', renderRegister);

baseRouter.get('/login', renderLogin);

baseRouter.get('/profile', isAuthenticated, renderProfile);

baseRouter.get('/', isAuthenticated, redirectToProfile);

export default baseRouter;