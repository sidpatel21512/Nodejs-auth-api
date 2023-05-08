import { ErrorHandler } from "../middlewares/error.js";
import { issueModel } from "../models/issue.js";
import { userModel } from "../models/user.js";

export const getIssue = async (req, res, next) => {
  const { id } = req.params

  try {
    const issue = await issueModel.findById(id);

    if (!issue) {
      next(new ErrorHandler("No issue found with given id", 404));
    }
    else {
      res.status(200).json({
        success: true,
        issue,
      });
    }

  } catch (error) {
    next(error);
  }
};
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
              userId: assignorId,
            },
          };
        }
      }
      const issue = await issueModel.create(finalPayload);
      res.status(201).json({
        success: true,
        message: "Issue created successfully.",
        issueId: issue._id,
      });
    } catch (error) {
      next(error);
    }
  }
};
export const getUsersIssues = async (req, res, next) => {
  const { userId } = req.params;

  try {

    const user = userModel.findById(userId);
    if (!user) {
      next(new ErrorHandler("Provided userid is invalid"), 400);
    }
    else {
      const myIssues = await issueModel.find({
        $or: [
          {
            "assignor.userId": userId,
          },
          { "createdBy.userId": userId },
        ],
      });

      res.status(200).json({
        success: true,
        issues: myIssues,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateIssue = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, type, priority, status, assignorId } = req.body;


  try {
    let finalPatchPayload = {
      ...(title && { title }),
      ...(description && { description }),
      ...(type && { type }),
      ...(priority && { priority }),
      ...(status && { status }),
      lastModifiedAt: Date.now()
    }

    if (assignorId) {
      const user = await userModel.findById(assignorId);
      if (!user) {
        next(new ErrorHandler("Can't find assignor from given id", 404));
        return;
      } else {
        const assignorName = user.username;

        finalPatchPayload = {
          ...finalPatchPayload,
          assignor: {
            username: assignorName,
            userId: assignorId,
          },
        };
      }
    }
    if (Object.keys(finalPatchPayload).length === 1) {
      next(new ErrorHandler("Please provide valid fields to update", 400));
      return;
    }
    else {
      await issueModel.updateOne(
        { _id: id },
        {
          $set: finalPatchPayload
        }
      );
      res.status(202).json({
        success: true,
        message: 'Issue updated successfully!'
      });
    }


  } catch (error) {
    next(error);
  }
};
