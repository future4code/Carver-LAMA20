import express from "express";
import {BandController} from "../controller/BandController";

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.get("/byname", bandController.byName);
bandRouter.get("/byId/:id", bandController.byId);
bandRouter.post("/register", bandController.register);
