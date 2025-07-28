import { StatusCodes } from "http-status-codes";

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
  };
  // Send the error response to the client
  if (process.env.BUILD_MODE === "production") {
    delete responseError.stack; // Remove stack trace in production
  }
  // Log the error for debugging purposes
  console.error("Error occurred:", responseError);
  res.status(responseError.statusCode).json(responseError);
};
