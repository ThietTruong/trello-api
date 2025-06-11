import { StatusCodes } from "http-status-codes";
const createNew = (req, res, next) => {
  try {
    console.log("req.body", req.body);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "POST from Validateion: API create new board",
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: new Error(error).message,
      timestamp: new Date(),
    });
  }
};

export const boardController = {
  createNew,
};
