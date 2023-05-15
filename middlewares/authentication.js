import jwt from "jsonwebtoken";
import { userModel } from "../models/v1/user.js";
import { ErrorHandler } from "./error.js";
import { issueModel } from "../models/v1/issue.js";

export const authenticationGuard = async (req, res, next) => {
    const { ip_cookie } = req.cookies;

    if (!ip_cookie) {
        next(new ErrorHandler("Unauthorized", 401));
    }
    else {
        try {
            const decodedData = jwt.decode(ip_cookie, process.env.JWT_SECRET);
            const jwtIssuingTime = decodedData.iat * 1000;
            const bufferTime = (15 * 60 * 1000);
            const isJWTExpired = (jwtIssuingTime + bufferTime) < Date.now();

            if (isJWTExpired) {
                next(new ErrorHandler("Your token is expired.Please login again", 403));
            }
            else {
                const user = await userModel.findById(decodedData?._id);
                if (!user) {
                    next(new ErrorHandler("Unauthorized", 401));
                } else if (!user.isActive) {
                    next(new ErrorHandler("This user is disabled", 403))
                }
                else {
                    req.user = user;
                    next();
                }
            }
        } catch (error) {
            next(new ErrorHandler(error.message, 401));
        }
    }
};

export const authorizationSelfGuard = (req, res, next) => {
    const { id } = req.params;
    const {user} = req;

    if ( user._id.toString() === id) {
        next();
    }
    else {
        next(new ErrorHandler("You don't have permission to perform this operation", 403));
    }
};

export const authorizationAdminGuard = (req, res, next) => {
    const { user } = req;

    if (user?.role === 'superAdmin' || user?.role === 'admin') {
        next();
    }
    else {
        next(new ErrorHandler("You don't have permission to perform this operation", 403));
    }
};

export const authorizationSuperAdminGuard = async (req, res, next) => {
    const { user } = req;

    if (user?.role === 'superAdmin') {
        next();
    }
    else {
        next(new ErrorHandler("You don't have permission to perform this operation", 403));
    }
};

export const authorizationIssueMutationGuard = async (req,res,next) => {
    const {id} = req.params;
    const {user} = req;
    const issue = await issueModel.findById(id);

    if(!issue){
        next(new ErrorHandler("Issue doesn't exist",404));
    } else{
        if(issue.assignor?.userId?.toString() === user._id ||
            issue.createdBy?.userId?.toString() === user._id.toString() ||
            user.role === 'admin' || 
            user.role === 'superAdmin') {
            next();
        }
        else{
            next(new ErrorHandler("You don't have permission to perform this operation", 403));
        }
    }
};
