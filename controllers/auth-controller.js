import { user } from "../models/user-model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.create({
        username, email, password: hashedPassword
    }).then(() => {
        res.render('success.ejs');
    });
}

export const loginUser = async (req,res) => {
    const { userid, password } = req.body;

    const user_one = await user.findOne({ $or: [{ email: userid }, { username: userid }] });

    if (user_one) {
        const isSamePassword = await bcrypt.compare(password, user_one.password);
        if (isSamePassword) {
            const token = jwt.sign({ _id: user_one._id }, "testSecret");
            res.cookie("secure_js_cookie", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 180000),
            });
            res.redirect('/profile');
        } else {
            res.render('login.ejs', {
                errorMessage: 'Entered password is incorrect'
            });
        }
    } else {
        res.render('login.ejs', {
            errorMessage: `No user exists for userid : ${userid}`
        })
    }
}

export const logoutUser = (req, res) => {
    res.cookie("secure_js_cookie", null, {
        expires: new Date(Date.now())
    });
    res.redirect('/login');
}