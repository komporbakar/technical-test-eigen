import dotenv from "dotenv";
import pgpPromise from "pg-promise";
dotenv.config();

const pgp = pgpPromise();

export const db = pgp({
  host: "localhost",
  port: 5432,
  database: "db_technical_test_eigen",
  user: "postgres",
  password: "laravel",
});

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

db.query("SELECT name, email FROM members ").then((res) => console.log(res));
