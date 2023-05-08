import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { initializeDB } from './Database/connection.js';
import baseRouter from './routers/base-routes.js';
import authRouter from './routers/auth-routes.js';

dotenv.config();

const app = express();

app.use(express.static(path.resolve() + '/public')); // for making express aware of statically served files.
app.use(express.urlencoded({ extended: true })); //for reading data through form submission.
app.use(cookieParser());// for parsing cookies through request headers.

app.use(baseRouter,authRouter);


app.listen(process.env.PORT, () => {
    console.log('Server started on ', process.env.PORT);
    initializeDB();
});
