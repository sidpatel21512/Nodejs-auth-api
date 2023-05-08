import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { initializeDBConnection } from './database/connect.js';

dotenv.config();

const app = express();

app.use(cookieParser());// for parsing cookies through request headers.
app.use(express.json());// for parsing requests-response in json format.


app.listen(process.env.PORT, () => {
    console.log('Server started on ', process.env.PORT);
    initializeDBConnection();
});
