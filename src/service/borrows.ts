import { db } from "../config/database";
import { ResponseError } from "../error/response-error";
import {
  CreateBorrowRequest,
  ReturnedBookRequest,
} from "../model/borrow-model";
import { convertDate } from "../utils/dateplus";
import { BorrowValidation } from "../validation/borrow-validation";
import { Validation } from "../validation/validation";

export class BorrowService {
  static async borrow(user: any, request: CreateBorrowRequest) {
    const borrowRequest = Validation.validate(BorrowValidation.BORROW, request);

    // Check Member Block OR Not
    const checkMember = await db.query(
      "SELECT * FROM members WHERE member_id = $1",
      [user.id]
    );

    if (checkMember[0].datetime_expired != null) {
      if (
        checkMember[0].datetime_blocked.toISOString() > new Date().toISOString()
      ) {
        throw new ResponseError(400, "Member is blocked");
      }
    }

    await db.query(
      "UPDATE members SET datetime_blocked = NULL, status = TRUE WHERE member_id = $1",
      [user.id]
    );

    // Check Book
    const checkBook = await db.query("SELECT * FROM books WHERE book_id = $1", [
      borrowRequest.book_id,
    ]);

    // Check Book Not Found
    if (checkBook.length == 0) {
      throw new ResponseError(400, "Book not found");
    }

    // Check Stock
    if (checkBook[0].stocks <= 0) {
      throw new ResponseError(400, "Book out of stock");
    }

    //count borrow member
    const checkCountBorrow = await db.query(
      "SELECT COUNT(*) FROM borrows WHERE member_id = $1 AND datetime_return IS NULL",
      [user.id]
    );

    // check max borrow
    if (checkCountBorrow[0].count >= 2) {
      throw new ResponseError(400, "Max 2 books can be borrowed");
    }

    // create borrow
    const createBorrow = await db.query(
      "INSERT INTO borrows (member_id, book_id, datetime_borrow) VALUES ($1, $2, $3) RETURNING *",
      [user.id, borrowRequest.book_id, new Date()]
    );

    // update stock book
    await db.query(
      "UPDATE books SET stocks = stocks - 1 WHERE book_id = $1 RETURNING *",
      [borrowRequest.book_id]
    );
    return createBorrow;
  }

  static async returned(user: any, request: ReturnedBookRequest) {
    const returnRequest = Validation.validate(BorrowValidation.RETURN, request);

    const checkReturn = await db.query(
      "SELECT * FROM borrows WHERE borrow_id = $1 AND member_id = $2 ",
      [returnRequest.borrow_id, user.id]
    );

    // check borrow not found
    if (checkReturn.length == 0) {
      throw new ResponseError(400, "Borrow not found");
    }

    // if book already returned
    if (checkReturn[0].datetime_return !== null) {
      throw new ResponseError(400, "Book already returned");
    }

    const time = convertDate(checkReturn[0].datetime_borrow, 7);
    console.log(time < new Date().toISOString());
    if (time < new Date().toISOString()) {
      const datetime_blocked = convertDate(new Date(), 3);
      console.log(datetime_blocked, "asasa");
      await db.query(
        "UPDATE members SET status = false, datetime_blocked = $1  WHERE member_id = $2 RETURNING *",
        [datetime_blocked, user.id]
      );
    }

    // update borrow
    const update = await db.query(
      "UPDATE borrows SET datetime_return = $1  WHERE borrow_id = $2 RETURNING *",
      [new Date(), returnRequest.borrow_id]
    );

    //update book
    await db.query(
      "UPDATE books SET stocks = stocks + 1 WHERE book_id = $1 RETURNING *",
      [checkReturn[0].book_id]
    );

    return update;
  }
}
