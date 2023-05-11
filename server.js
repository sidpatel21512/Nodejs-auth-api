import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { initializeDBConnection } from './database/connect.js';
import { ErrorMiddleware } from './middlewares/error.js';
import userRouter from './routers/v1/user.js';
import issueRouter from './routers/v1/issue.js';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerDocument } from './docs/index.js';

dotenv.config();

const app = express();

app.use(express.json());// for parsing requests-response in json format.
app.use(cookieParser());// for parsing cookies through request headers.
app.use(helmet())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

app.get('/', (_, res) => {
    res.status(200).json({
        succes: 200,
        message: 'Hello Issue Portal!'
    });
});

app.use('/api/v1/users', userRouter);// for registering user-rotes
app.use('/api/v1/issues', issueRouter);//for registering issue-routes
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log('Server started on ', process.env.PORT);
    initializeDBConnection();
});

app.use(ErrorMiddleware);