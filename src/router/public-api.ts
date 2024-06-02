import express from "express";
import { UsersController } from "../controller/users";

export const publicApiRouter = express.Router();

publicApiRouter.post("/register", UsersController.register);
publicApiRouter.post("/login", UsersController.login);
