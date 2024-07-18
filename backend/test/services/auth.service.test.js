import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import {
  register,
  login,
  logout,
  changePassword,
  validateToken,
} from "../../src/services/auth.service";
import User from "../../src/models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Auth service tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  vi.mock("./../../src/models/user.model.js", () => ({
    default: vi.fn(function (userData) {
      this.username = userData.username;
      this.email = userData.email;
      this.full_name = userData.full_name;
      this.password = userData.password;
      this.friends = [];
      this.weight_log = [];
      this.save = vi.fn();
    }),
  }));

  describe("register", () => {
    it("should create a new user and save it to the database", async () => {
      const userData = {
        username: "jamesmay",
        email: "jamesmay@hotmail.com",
        full_name: {
          first_name: "James",
          middle_name: "Marvin",
          last_name: "May",
        },
        password: "123456",
      };

      const user = await register(userData);
      expect(User).toHaveBeenCalled();
      // expect(user.save).toHaveBeenCalled();
      // expect(user.username).toStrictEqual("jamesmay");
    });

    it("should throw an error if no user data is given", async () => {
      await expect(register()).rejects.toThrowError();
    });
  });

  describe("login", () => {
    it("should return an object with user details given valid username and password", async () => {
      User.findOne = vi.fn();
      const mockId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockId,
        username: "jamesmay",
        full_name: {
          first_name: "James",
          middle_name: "Marvin",
          last_name: "May",
        },
        email: "jamesmay@hotmail.com",
        password: "123456",
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });
      bcrypt.compareSync = vi.fn(() => true);
      jwt.sign = vi.fn(() => "mockAccessToken");
      const userInfo = await login("jamesmay", "123456");
      expect(userInfo).toStrictEqual({
        accessToken: "mockAccessToken",
        email: "jamesmay@hotmail.com",
        full_name: {
          first_name: "James",
          last_name: "May",
          middle_name: "Marvin",
        },
        id: mockId,
        username: "jamesmay",
      });
    });

    it("should throw an error if the user is not found", async () => {
      User.findOne = vi.fn();
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });
      const username = "jamesmay";
      const password = "123456";
      await expect(() => login(username, password)).rejects.toThrowError();
    });

    it("should throw an error if the user/password combination is incorrect", async () => {
      User.findOne = vi.fn();
      const mockId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockId,
        username: "jamesmay",
        full_name: {
          first_name: "James",
          middle_name: "Marvin",
          last_name: "May",
        },
        email: "jamesmay@hotmail.com",
        password: "123456",
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });
      bcrypt.compareSync = vi.fn(() => false);
      const username = "jamesmay";
      const password = "78910";
      await expect(() => login(username, password)).rejects.toThrowError();
    });
  });

  describe("changePassword", async () => {
    it("should return a success message on successfully changing password", async () => {
      const mockUser = { save: vi.fn() };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });
      bcrypt.compareSync = vi.fn(() => true);
      bcrypt.hash = vi.fn(() => true); // Added missing mock for bcrypt.hash

      const username = "jamesmay";
      const oldPassword = "123456";
      const newPassword = "78910";
      const response = await changePassword(username, oldPassword, newPassword);
      expect(response.message).toStrictEqual("Successfully changed password");
    });

    it("should throw an error if user is not found", async () => {
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });
      await expect(() => changePassword()).rejects.toThrowError();
    });

    it("should throw an error if the password is invalid", async () => {
      const mockUser = {};
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });
      bcrypt.compareSync = vi.fn(() => false);
      await expect(() => changePassword()).rejects.toThrowError();
    });
  });

  describe("validateToken", () => {
    it("should return user data when a valid token is provided", async () => {
      const mockId = new mongoose.Types.ObjectId();
      const mockUser = {
        _id: mockId,
        username: "jamesmay",
        full_name: "James Marvin May",
        email: "jamesmay@hotmail.com",
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const token = "mockToken";
      const result = await validateToken(token);

      expect(result).toEqual({
        id: mockUser._id,
        username: mockUser.username,
        full_name: mockUser.full_name,
        email: mockUser.email,
      });
    });

    it("should throw an error if the token is invalid or user not found", async () => {
      User.findOne = vi.fn();
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });

      const token = "invalidToken";
      await expect(() => validateToken(token)).rejects.toThrowError(
        "Error logging in user"
      );
    });

    it("should throw an error if an unexpected error occurs during token validation", async () => {
      User.findOne = vi.fn();
      User.findOne.mockRejectedValue(new Error("Database error"));

      const token = "validToken";
      await expect(() => validateToken(token)).rejects.toThrowError(
        "Error logging in user"
      );
    });
  });
});
