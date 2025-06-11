// File content was just a comment block that has been removed
import express from 'express';
import { StatusCodes } from "http-status-codes";
import { boardRouters } from './boardRouters.js';



const Router = express.Router();

Router.get("/status", (req, res) => {
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "API V1 are ready to use.",
        timestamp: new Date()
    })
})
// Board API
Router.use(boardRouters); 

export const APIs_V1 = Router;