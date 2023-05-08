import { user } from './models/user-model.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    const cookie = req.cookies?.secure_js_cookie;
    if (cookie) {
        const { _id } = jwt.verify(cookie, process.env.JWT_SECRET);
        const userData = await user.findById(_id);

        if (userData) {
            req.user = userData;
            next();
        }
        else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};