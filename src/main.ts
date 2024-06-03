import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import "./config/database";
import swaggerDocument from "./doc/specapi.json";
import { errorMiddleware } from "./middleware/error-middleware";
import { privateApiRouter } from "./router/private-api";
import { publicApiRouter } from "./router/public-api";
export const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const version = "/api/v1";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`${version}`, publicApiRouter);
app.use(`${version}`, privateApiRouter);
app.use(errorMiddleware);

app.listen(3000, () => console.log(`Server running in http://localhost:3000`));
