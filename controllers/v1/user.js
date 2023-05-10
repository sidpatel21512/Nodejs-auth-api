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
    if (!id?.trim()) {
        next(new ErrorHandler("Please provide userid", 400));
        return;
    }
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
export const getAllUsers = async (req, res, next) => {
    const activeQueryParam = req.query.active?.trim();
    const isActive = activeQueryParam === 'false' ? false : true;

    try {
        const users = await userModel.find({ isActive }).sort({ lastModifiedAt: 1 });
        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    const { username, isActive } = req.body;
    const { id } = req.params;

    if (!id?.trim()) {
        next(new ErrorHandler("Please provide userid", 400));
        return;
    }
    const finalPatchPayload = {
        lastModifiedAt: Date.now(),
        ...(username.trim() && { username }),
        ...((typeof isActive === 'boolean') ? { isActive } : {})
    };
    if (Object.keys(finalPatchPayload).length === 1) {
        next(new ErrorHandler("Please provide valid fields to update", 400));
    }
    else {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                next(new ErrorHandler("User not found for given id", 404));
            }
            else {
                await userModel.updateOne({ _id: id }, { $set: finalPatchPayload }, { runValidators: true });
                res.status(202).json({
                    success: true,
                    message: `User updated successfully!`
                })
            }
        } catch (error) {
            next(error);
        }
    }
};

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!id?.trim()) {
        next(new ErrorHandler("Please provide userid", 400));
    }
    else if (id === req.user._id.toString()) {
        next(new ErrorHandler("Couldn't delete logged in user!", 409));
    }
    else {
        try {
            const user = await userModel.findOneAndDelete({ _id: id });

            if (!user) {
                next(new ErrorHandler("User does not exist", 404));
                return;
            }

            res.status(200).json({
                success: true,
                message: 'User deleted successfully!'
            });
        } catch (error) {
            next(error);
        }
    }
}