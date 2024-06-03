import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "./jwt";

export interface RequestUser {
  id: number;
  email: string;
}

export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: true,
        message: "Invalid token or expired",
      });
    }
    const payload: any = verifyJWT({ token });
    if (!payload) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: true,
        message: "Invalid token or expired",
      });
    }
    console.log(payload);
    (req.user as RequestUser) = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
