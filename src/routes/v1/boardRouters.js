import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "../../validations/boardValidation.js";

const Router = express.Router();

Router.route("/")
    .get((req, res) => {
        res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            message: "Note: API get list board.",
            timestamp: new Date(),
            data: [],
        })
    })
    .post(boardValidation.createNew)


export const boardRouters = Router;       
 