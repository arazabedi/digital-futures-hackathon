import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import route from "../../src/routes/routes.js";

const app = express();
app.use(bodyParser.json());
app.use("/", route);

describe("Routes Tests", () => {
  it("should respond with 'Hello, world!' on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Hello, world!");
  });

  it.skip("should register a user successfully on POST /auth/register", async () => {
    const userData = {
      username: "testuser",
      full_name: {
        first_name: "John",
        middle_name: "Doe",
        last_name: "Smith",
      },
      email: "testuser@example.com",
      password: "testpassword",
    };

    const response = await request(app).post("/auth/register").send(userData);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully!"
    );
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("username", userData.username);
    expect(response.body.user).toHaveProperty("email", userData.email);
  });

});
