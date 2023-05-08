import express from 'express';
import { createIssue, getIssue, getMyIssues, updateIssue } from '../controllers/issue.js';
import { authenticationGuard } from '../middlewares/authentication.js';

const issueRouter = express.Router();

issueRouter.get('/:id',authenticationGuard, getIssue);
issueRouter.get('/myIssues',authenticationGuard, getMyIssues);
issueRouter.post('/',authenticationGuard, createIssue);
issueRouter.patch('/:id',authenticationGuard, updateIssue);

export default issueRouter;
