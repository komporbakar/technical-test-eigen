import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  database: process.env.DATABASE_POSTGRES,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpired: process.env.JWT_EXPIRED,
};
