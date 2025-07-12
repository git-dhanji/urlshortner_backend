// utils/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// utils/catchAsync.js
export const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};



// middlewares/globalErrorHandler.js
export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // ✅ Handle MongoDB cast error (invalid ObjectId)
  if (err.name === "CastError") {
    message = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
  }

  // ✅ Handle MongoDB duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${field}`;
    statusCode = 400;
  }

  // ✅ Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");
    statusCode = 400;
  }

  // ✅ JWT token errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again.";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Your token has expired. Please log in again.";
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};


export const WrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
}