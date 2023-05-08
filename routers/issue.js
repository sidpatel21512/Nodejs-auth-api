import express from 'express';
import { createIssue, getIssue, getUsersIssues, updateIssue } from '../controllers/issue.js';
import { authenticationGuard } from '../middlewares/authentication.js';

const issueRouter = express.Router();

issueRouter.get("/:id", authenticationGuard, getIssue);
issueRouter.get('/user-issues/:userId', authenticationGuard, getUsersIssues);
issueRouter.post('/',authenticationGuard, createIssue);
issueRouter.patch('/:id',authenticationGuard, updateIssue);

export default issueRouter;
