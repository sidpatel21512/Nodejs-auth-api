import express from 'express';
import { createIssue, getAllIssues, getIssue, getUsersIssues, updateIssue, deleteIssue } from '../../controllers/v1/issue.js';
import { authenticationGuard } from '../../middlewares/authentication.js';

const issueRouter = express.Router();

issueRouter.get("/", authenticationGuard, getAllIssues);
issueRouter.get("/:id", authenticationGuard, getIssue);
issueRouter.get('/user-issues/:userId', authenticationGuard, getUsersIssues);
issueRouter.post('/', authenticationGuard, createIssue);
issueRouter.patch('/:id', authenticationGuard, updateIssue);
issueRouter.delete('/:id', authenticationGuard, deleteIssue);

export default issueRouter;
