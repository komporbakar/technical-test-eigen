import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./config/database";
import { errorMiddleware } from "./middleware/error-middleware";
import { publicApiRouter } from "./router/public-api";
export const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(publicApiRouter);
app.use(errorMiddleware);

app.listen(3000, () => console.log(`Server running in http://localhost:3000`));
