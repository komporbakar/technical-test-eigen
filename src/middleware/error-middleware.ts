import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: error.issues,
      });
    } else if (error instanceof ResponseError) {
      return res.status(error.status).json({
        error: true,
        message: error.message,
      });
    } else {
      throw error;
    }
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: err || "Internal Server Error",
    });
  }
};
