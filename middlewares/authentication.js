import { userModel } from "../models/user.js";
import { ErrorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const authenticationGuard = async (req, res, next) => {
    const { ip_cookie } = req.cookies;

    if (!ip_cookie) {
        next(new ErrorHandler("Invalid Cookies", 403));
    }
    else {
        try {
            const decodedData = jwt.decode(ip_cookie, process.env.JWT_SECRET);
            const user = await userModel.findById(decodedData?._id);
            if (!user) {
                next(new ErrorHandler("Unauthorized", 401));
            } else {
                req.user = user;
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}