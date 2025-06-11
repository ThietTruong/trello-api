import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "../../validations/boardValidation.js";
import { boardController } from "~/controllers/boardController.js";

const Router = express.Router();

Router.route("/boards")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: "Note: API get list board.",
      timestamp: new Date(),
      data: [],
    });
  })
  .post(boardValidation.createNew, boardController.createNew);

export const boardRouters = Router;
