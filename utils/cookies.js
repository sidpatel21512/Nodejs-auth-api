import jwt from 'jsonwebtoken';

export const sendCookies = (res, cookieName, statusCode, message, user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(statusCode).cookie(cookieName, token, {
        httpOnly: true,
        maxAge: new Date(Date.now() + (15 * 60 * 1000)), //expiration time of 15 mins.
        sameSite: process.env.ENV === "DEV" ? "lax" : "none",
        secure: process.env.ENV === "DEV" ? false : true
    }).json({
        success: true,
        message
    });
};

export const removeCookies = (res, cookieName, statusCode, message) => {
    res.clearCookie(cookieName)
        .status(statusCode)
        .json({
            success: true,
            message
        });
}