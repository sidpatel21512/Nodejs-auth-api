import bcrypt from "bcrypt";
import { ErrorHandler } from "../../middlewares/error.js";
import { userModel } from "../../models/v1/user.js";
import { removeCookies, sendCookies } from "../../utils/cookies.js";

export const registerUser = async (req, res, next) => {
    const { email, username, password } = req.body;

    if (!email?.trim()) {
        next(new ErrorHandler("Please provide email address", 400))
    }
    else if (!username?.trim()) {
        next(new ErrorHandler("Please provide username", 400))
    }
    else if (!password?.trim()) {
        next(new ErrorHandler("Please provide password", 400))
    }
    else if (password?.trim().length < 4) {
        next(new ErrorHandler("Password of at least 5 characters is required", 400))
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({ email, username, password: hashedPassword });
            res.status(201).json({
                success: true,
                message: `User ${username} created successfully!`,
                userId: user._id
            })
        } catch (error) {
            next(error);
        }

    }
};

export const loginUser = async (req, res, next) => {
    //email-id or username anything can be provided in form of userid
    const { userId, password } = req.body;

    if (!userId?.trim()) {
        next(new ErrorHandler("Please provide userId", 400))
    }
    else if (!password?.trim()) {
        next(new ErrorHandler("Please provide password", 400))
    }
    else {
        try {
            const user = await userModel.findOne({ $or: [{ email: userId }, { username: userId }] }, "+password");
            if (!user) {
                next(new ErrorHandler("User not found", 404))
            }
            else {
                const isPasswordSame = await bcrypt.compare(password, user.password);
                if (!isPasswordSame) {
                    next(new ErrorHandler("Invalid Password", 400))
                }
                else {
                    sendCookies(res, "ip_cookie", 200, "User logged in successfully!", user);
                }
            }
        } catch (error) {
            next(error);
        }
    }
};

export const logoutUser = (req, res, next) => {
    const { ip_cookie } = req.cookies;

    if (!ip_cookie) {
        next(new ErrorHandler("Unauthorized", 401));
    }
    else {
        try {
            removeCookies(res, "ip_cookie", 200, "Successfully logged out!");
        } catch (error) {
            next(error);
        }
    }
}
export const getMyUser = (req, res) => {
    const userData = req.user;
    res.status(200).json({
        success: true,
        user: userData
    });
}
export const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            next(new ErrorHandler("User not found for given id", 404));
        }
        else {
            res.status(200).json({
                success: true,
                user
            });
        }
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { username } = req.body;
    const { id } = req.params;

    if (!username?.trim()) {
        next(new ErrorHandler("Please provide username"), 400);
    }
    else if (!id?.trim()) {
        next(new ErrorHandler("Please provide userid"), 400);
    }
    else {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                next(new ErrorHandler("User not found for given id"), 404);
            }
            else {
                await userModel.updateOne({ _id: id }, { $set: { username, lastModifiedAt: Date.now() } }, { runValidators: true });
                res.status(202).json({
                    success: true,
                    message: `Username updated successfully!`
                })
            }
        } catch (error) {
            next(error);
        }
    }
};
