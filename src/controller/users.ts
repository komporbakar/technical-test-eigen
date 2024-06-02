import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateUserRequest, LoginRequest } from "../model/user-model";
import { UserService } from "../service/users";

export class UsersController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      return res.status(StatusCodes.CREATED).json({
        error: false,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await UserService.login(request);
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Login Success",
        data: {
          token: response,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async get() {}
  async post() {}
  async put() {}
  async delete() {}
}
