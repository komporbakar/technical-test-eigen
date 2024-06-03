import supertest from "supertest";
import { app } from "../src/main";
import { UserTest } from "./test-utils";

describe("API Borrows '/api/v1/borrow'", () => {
  let token;
  beforeEach(async () => {
    token = await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("Should borrow success with status 201", async () => {
    const response = await supertest(app)
      .post("/api/v1/borrow")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        book_id: "NRN-7",
      });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
  });

  it("Should borrow failed if Authorization not found with status 400", async () => {
    const response = await supertest(app).post("/api/v1/borrow").send({
      book_id: "NRN-7",
    });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe(true);
  });
});

describe("API Return '/api/v1/return'", () => {
  let token;
  beforeEach(async () => {
    token = await UserTest.create();
    await UserTest.createBorrow();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("Should return success with status 201", async () => {
    const response = await supertest(app)
      .post("/api/v1/return")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        borrow_id: 2,
      });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
  });

  it("Should borrow failed if Authorization not found with status 400", async () => {
    const response = await supertest(app).post("/api/v1/borrow").send({
      borrow_id: "2",
    });
    expect(response.status).toBe(401);
    expect(response.body.error).toBe(true);
  });
});

describe("API Return '/api/v1/book'", () => {
  let token;
  beforeEach(async () => {
    token = await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("Should return success with status 200", async () => {
    const response = await supertest(app)
      .get("/api/v1/book")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
