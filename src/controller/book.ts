import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BookService } from "../service/book";
import { UserRequest } from "../type/user-request";

export class BookController {
  static async getBooks(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await BookService.getBooks(req.user);
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Success get books",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
