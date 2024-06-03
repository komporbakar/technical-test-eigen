import zod from "zod";

export class BorrowValidation {
  static BORROW = zod.object({
    member_id: zod
      .string({ required_error: "Member id is required" })
      .optional(),
    book_id: zod.string({ required_error: "Book id is required" }),
  });
  static RETURN = zod.object({
    member_id: zod
      .string({ required_error: "Member id is required" })
      .optional(),
    borrow_id: zod
      .number({ required_error: "Borrow id is required" })
      .positive(),
  });
}
