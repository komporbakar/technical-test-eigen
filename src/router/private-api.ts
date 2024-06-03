import express from "express";
import { BookController } from "../controller/book";
import { BorrowsController } from "../controller/borrows";
import { authenticate } from "../middleware/auth-middleware";

export const privateApiRouter = express.Router();

privateApiRouter.post("/borrow", authenticate, BorrowsController.borrow);
privateApiRouter.post("/returned", authenticate, BorrowsController.returned);

//List book
privateApiRouter.get("/book", authenticate, BookController.getBooks);
