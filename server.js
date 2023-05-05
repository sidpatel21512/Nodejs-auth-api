import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { user } from './models/user-model.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app = express();
dotenv.config();

app.use(express.static(path.resolve() + '/public'));// for making express aware of statically served files.
app.use(express.urlencoded({ extended: true }));//for reading data through form submission
app.use(cookieParser());

const initializeDB = () => {
    mongoose.connect(`mongodb+srv://aviok24:${process.env.NODE_APP_USER_DB_PASSWORD}@free-cluster.pjka4r9.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: 'Free-cluster',
    }).then(() => {
        console.log('Database Connected');
    }).catch(e => console.error('Error occurred : ', e))
}

const isAuthenticated = async (req, res, next) => {
    const cookie = req.cookies?.secure_js_cookie;
    if (cookie) {
        const { _id } = jwt.verify(cookie, "testSecret");
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

app.get('/register', (req, res) => {
    res.render('register.ejs', {
        name: 'User'
    })
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/logout', (req, res) => {
    res.cookie("secure_js_cookie", null, {
        expires: new Date(Date.now())
    });
    res.redirect('/login');
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs', {
        username: req.user.username
    })
});

app.get('/', isAuthenticated, (req, res) => {
    res.redirect('/profile');
});

app.post('/login', async (req, res) => {
    const { userid, password } = req.body;

    const user_one = await user.findOne({ $or: [{ email: userid }, { username: userid }] });

    //checking of valid user is pending...
    if (user_one) {
        const isSamePassword = await bcrypt.compare(password, user_one.password);
        if (isSamePassword) {
            const token = jwt.sign({ _id: user_one._id }, "testSecret");
            res.cookie("secure_js_cookie", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 180000),
            });

            res.redirect('/profile');
        }
        else {
            res.render('login.ejs', {
                errorMessage: 'Entered password is incorrect'
            });
        }
    }
    else {
        res.render('login.ejs', {
            errorMessage: `No user exists for userid : ${userid}`
        })
    }
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.create({
        username, email, password: hashedPassword
    }).then(() => {
        res.render('success.ejs');
    });
});


app.listen(process.env.PORT, () => {
    console.log('Server started on ', process.env.PORT);
    initializeDB();
});
