import jwt from 'jsonwebtoken';

export const sendCookies = (res,statusCode,message,user) => {
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statusCode).cookie("ip_cookie",token,{
        httpOnly: true,
        maxAge: new Date(Date.now()+15*60*1000), //expiration time of 15 mins.
    }).json({
        success: true,
        message
    });
};
