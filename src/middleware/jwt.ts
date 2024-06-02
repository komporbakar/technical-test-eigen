import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const createToken = (payload: any) => {
  return {
    id: payload.id,
    email: payload.email,
  };
};

export const createJWT = ({ payload }: { payload: any }) => {
  const token = jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: config.jwtExpired as string,
  });
  return token;
};

export const verifyJWT = ({ token }: { token: string }) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    return decoded;
  } catch (error) {
    return null;
  }
};
