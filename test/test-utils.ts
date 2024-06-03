import bcrypt from "bcrypt";
import { db } from "../src/config/database";
import { createJWT } from "../src/middleware/jwt";

export class UserTest {
  static async delete() {
    await db.query("DELETE FROM members WHERE member_id = 4");
    await db.query("DELETE FROM members WHERE email = 'test@email.com'");
  }

  static async create() {
    const bcryptPass = await bcrypt.hash("rahasia123", 10);
    await db.query(
      `INSERT INTO members (member_id, email, password, name) VALUES (4,'test@email.com', $1, 'Test Aja 2')`,
      [bcryptPass]
    );
    // console.log(data);
    const token = createJWT({
      payload: { id: 4, email: "test@email.com" },
    });
    return token;
  }

  static async createBorrow() {
    const date = new Date().toISOString();
    const borrow = await db.query(
      `INSERT INTO borrows (borrow_id,member_id, book_id, datetime_borrow, datetime_return) VALUES (2, 4, 'JK-45', '${date}', NULL) RETURNING *`
    );
    return borrow;
  }
}
