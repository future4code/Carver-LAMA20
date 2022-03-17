import express from "express";
import {BandController} from "../controller/BandController";

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.get("/info/:id", bandController.info);
bandRouter.post("/register", bandController.register);
