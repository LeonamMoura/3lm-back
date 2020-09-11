import express from "express";
import { loginManager } from "../controller/managers/loginManager";
import { registerManager } from "../controller/managers/registerManager";


export const managersRouter = express.Router();

managersRouter.post("/signup", registerManager);
managersRouter.post("/login", loginManager);