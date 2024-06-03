import supertest from "supertest";
import { app } from "../src/main";
import { UserTest } from "./test-utils";

describe("API Register '/api/v1/register'", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("Should register success with status 201", async () => {
    const response = await supertest(app).post("/api/v1/register").send({
      email: "test@email.com",
      name: "Test Aja",
      password: "rahasia123",
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe("test@email.com");
    expect(response.body.data.name).toBe("Test Aja");
  });

  it("Should register failed not format with status 400", async () => {
    const response = await supertest(app).post("/api/v1/register").send({
      email: "test$email.com",
      name: "Test Aja",
    });

    expect(response.status).toBe(400);
  });

  it("Should register failed duplicate email registration with status 400", async () => {
    const response = await supertest(app).post("/api/v1/register").send({
      email: "test1@email.com",
      name: "Test Aja",
      password: "rahasia123",
    });
    expect(response.status).toBe(400);
  });
});

describe("API Login '/api/v1/login'", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("Should login success with status 200", async () => {
    const response = await supertest(app).post("/api/v1/login").send({
      email: "test@email.com",
      password: "rahasia123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login Success");
  });

  it("Should login failed if password not match with status 400", async () => {
    const response = await supertest(app).post("/api/v1/login").send({
      email: "test@email.com",
      password: "rahasia1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Credential Not Match");
  });

  it("Should login failed if email not exist with status 400", async () => {
    const response = await supertest(app).post("/api/v1/login").send({
      email: "test1.salah@email.com",
      password: "rahasia123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe("Credential Not Match");
  });

  it("Should login failed if email or password empty with status 400", async () => {
    const response = await supertest(app).post("/api/v1/login").send({
      email: "",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBeDefined();
  });
});

describe("API List Members '/api/v1/listmembers'", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("Should list members success with status 200", async () => {
    const response = await supertest(app).get("/api/v1/members");
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
