import bcrypt from "bcrypt";
import { db } from "../config/database";
import { ResponseError } from "../error/response-error";
import { createJWT, createToken } from "../middleware/jwt";
import { CreateUserRequest, LoginRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async register(request: CreateUserRequest) {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    const checkUser = await db.query(
      "SELECT COUNT(email) FROM members WHERE email = $1",
      [registerRequest.email]
    );
    if (checkUser[0].count > 0) {
      throw new ResponseError(400, "User already exist");
    }

    const bcryptPassword = await bcrypt.hash(registerRequest.password, 10);

    const createUser = await db.query(
      "INSERT INTO members (email, password, name) VALUES ($1, $2, $3) RETURNING *",
      [registerRequest.email, bcryptPassword, registerRequest.name]
    );
    return createUser[0];
  }

  static async login(request: LoginRequest) {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const checkUser = await db.query("SELECT * FROM members WHERE email = $1", [
      loginRequest.email,
    ]);
    console.log(checkUser);

    if (checkUser.length == 0) {
      throw new ResponseError(400, "Credential Not Match");
    }

    // Check Password match or not match
    const checkPassword = await bcrypt.compare(
      loginRequest.password,
      checkUser[0].password
    );

    if (!checkPassword) {
      throw new ResponseError(400, "Credential Not Match");
    }

    //create token
    const token = createJWT({ payload: createToken(checkUser[0]) });
    return token;
  }

  static async listMembers() {
    const members = await db.query(
      "SELECT m.name, m.email, COUNT(bb.member_id) FROM members m LEFT JOIN borrows bb ON m.member_id = bb.member_id WHERE bb.datetime_return IS NULL GROUP BY m.name, m.email"
    );
    return members;
  }
}
