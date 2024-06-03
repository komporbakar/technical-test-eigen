import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  CreateBorrowRequest,
  ReturnedBookRequest,
} from "../model/borrow-model";
import { BorrowService } from "../service/borrows";
import { UserRequest } from "../type/user-request";

export class BorrowsController {
  static async borrow(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateBorrowRequest = req.body as CreateBorrowRequest;
      const response = await BorrowService.borrow(req.user!, request);
      return res.status(StatusCodes.CREATED).json({
        error: false,
        message: "Success borrow book",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async returned(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: ReturnedBookRequest = req.body as ReturnedBookRequest;
      const response = await BorrowService.returned(req.user!, request);
      return res.status(StatusCodes.OK).json({
        error: false,
        message: "Success returned book",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
