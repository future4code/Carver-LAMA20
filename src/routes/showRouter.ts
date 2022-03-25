import express from "express";
import {ShowController} from "../controller/ShowController";


export const showRouter = express.Router();

const showController = new ShowController();

showRouter.get("/byday", showController.in_day);
showRouter.post("/create", showController.createShow)