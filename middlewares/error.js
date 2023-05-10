export class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const ErrorMiddleware = (error, req, res, next) => {
    console.error(error.message);
    const message = error.message || "Internal Server Error";
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message,
    });
};
