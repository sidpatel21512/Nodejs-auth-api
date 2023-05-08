import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { initializeDBConnection } from './database/connect.js';
import userRouter from './routers/user.js';
import { ErrorMiddleware } from './middlewares/error.js';

dotenv.config();

const app = express();

app.use(express.json());// for parsing requests-response in json format.
app.use(cookieParser());// for parsing cookies through request headers.

app.use('/api/v1/users', userRouter);

app.listen(process.env.PORT, () => {
    console.log('Server started on ', process.env.PORT);
    initializeDBConnection();
});

app.use(ErrorMiddleware);