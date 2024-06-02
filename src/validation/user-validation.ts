import zod from "zod";
export class UserValidation {
  static REGISTER = zod.object({
    email: zod.string().email({ message: "Invalid email" }),
    password: zod
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    name: zod
      .string()
      .min(3, { message: "Name must be at least 3 characters" }),
  });
  static LOGIN = zod.object({
    email: zod.string().email({ message: "Invalid email" }),
    password: zod
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });
}
