import jwt from "jsonwebtoken";
import { userModel } from "../models/v1/user.js";
import { ErrorHandler } from "./error.js";

export const authenticationGuard = async (req, res, next) => {
    const { ip_cookie } = req.cookies;

    if (!ip_cookie) {
        next(new ErrorHandler("Unauthorized", 401));
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