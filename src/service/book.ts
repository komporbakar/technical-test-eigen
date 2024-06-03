import { db } from "../config/database";

export class BookService {
  static async getBooks(user: any) {
    const listBook = await db.query(
      `SELECT b.title, b.stocks 
       FROM books b 
       WHERE b.book_id NOT IN (
         SELECT bb.book_id 
         FROM borrows bb 
         WHERE bb.member_id = $1 AND bb.datetime_return IS NULL
       )`,
      [user.id]
    );
    console.log(listBook.rows);
    return listBook;
  }
}
