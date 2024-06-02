import dotenv from "dotenv";
import pgp from "pg-promise";
import { config } from "./config";
dotenv.config();

export const db = pgp()(config.database as string);

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

db.query("SELECT * FROM members").then((res) =>
  console.log("Success Get Data")
);

db.query("INSERT INTO books (");
