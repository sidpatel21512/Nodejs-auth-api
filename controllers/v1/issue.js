import { ErrorHandler } from "../../middlewares/error.js";
import { issueModel } from "../../models/v1/issue.js";
import { userModel } from "../../models/v1/user.js";

export const getAllIssues = async (req, res, next) => {
  try {
    const issues = await issueModel.find({}).sort({ lastModifiedAt: -1 });
    res.status(200).json({
      success: true,
      issues
    });
  } catch (error) {
    next(error);
  }
};

export const getIssue = async (req, res, next) => {
  const { id } = req.params;

  if (!id?.trim()) {
    next(new ErrorHandler("Please provide issue id", 400));
    return;
  }

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
    next(new ErrorHandler("Please provide title of issue", 400));
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

  if (!userId?.trim()) {
    next(new ErrorHandler("Please provide userid", 400));
    return;
  }

  try {

    const user = userModel.findById(userId);
    if (!user) {
      next(new ErrorHandler("User does not exist for given id", 400));
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

  if (!id?.trim()) {
    next(new ErrorHandler("Please provide issueid", 400));
    return;
  }

  try {
    let finalPatchPayload = {
      ...((typeof title === 'string') ? { title } : {}),
      ...((typeof description === 'string') ? { description } : {}),
      ...(type && { type }),
      ...(priority && { priority }),
      ...(status && { status }),
      lastModifiedAt: Date.now()
    };

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
        },
        { runValidators: true }
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

export const deleteIssue = async (req, res, next) => {
  const { id } = req.params;
  if (!id?.trim()) {
    next(new ErrorHandler("Please provide issueid", 400));
    return;
  }
  try {
    const issue = await issueModel.findOneAndDelete({ _id: id });

    if (!issue) {
      next(new ErrorHandler("Issue does not exist", 404));
      return;
    }
    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
};
