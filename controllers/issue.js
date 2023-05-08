import { ErrorHandler } from "../middlewares/error.js";
import { issueModel } from "../models/issue.js";
import { userModel } from "../models/user.js";

export const getIssue = (req, res, next) => {

}
export const createIssue = async (req, res, next) => {
    const { title, description, type, priority, status, assignorId } = req.body;

    if (!title?.trim()) {
        next(new ErrorHandler("Please provide title of issue"), 400);
    } else {
        const createdById = req.user?._id;
        const createdByName = req.user?.username;

        try {
            let finalPayload = {
                title,
                ...(description && { description }),
                ...(type && { type }),
                ...(priority && { priority }),
                ...(status && { status }),
                createdBy: {
                    username: createdByName,
                    userId: createdById,
                },
            };
            if (assignorId) {
                const user = await userModel.findById(assignorId);
                if (!user) {
                    next(new ErrorHandler("Can't find assignor from given id", 404));
                } else {
                    const assignorName = user.username;

                    finalPayload = {
                        ...finalPayload,
                        assignor: {
                            username: assignorName,
                            userId: assignorId
                        },
                    };
                }
            }
            const issue = await issueModel.create(finalPayload);
            res.status(201).json({
                success: true,
                message: `Issue created successfully.`,
                issueId: issue._id
            });
        } catch (error) {
            next(error);
        }
    }
}
export const getMyIssues = (req, res, next) => {

}
export const updateIssue = (req, res, next) => {

}