import { describe, it, expect, vi, beforeEach } from "vitest";
import { validationResult } from "express-validator";

import {
  registerController,
  loginController,
  logoutController,
  changePasswordController,
  validateTokenController,
} from "../../src/controllers/auth.controller.js";

import {
  register,
  login,
  logout,
  changePassword,
  validateToken,
} from "../../src/services/auth.service.js";

vi.mock("../../src/services/auth.service.js", () => ({
  register: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  changePassword: vi.fn(),
  validateToken: vi.fn(),
}));

vi.mock("express-validator", () => ({
  validationResult: vi.fn(() => ({
    isEmpty: () => true,
    array: () => [],
  })),
}));

const createMockReqRes = (body = {}, headers = {}, userId = null) => {
  const req = {
    body,
    headers,
    userId,
  };
  const res = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };
  return { req, res };
};

describe("Auth Controllers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerController", () => {
    it("should register a user and return a 201 status", async () => {
      const { req, res } = createMockReqRes({
        username: "testuser",
        email: "test@example.com",
        full_name: "Test User",
        password: "password123",
      });

      register.mockResolvedValue({ success: true });

      await registerController(req, res);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(register).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        full_name: "Test User",
        password: "password123",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ success: true });
    });

    it("should return a 422 status if validation fails", async () => {
      validationResult.mockReturnValueOnce({
        isEmpty: () => false,
        array: () => [{ msg: "Invalid input" }],
      });

      const { req, res } = createMockReqRes({});

      await registerController(req, res);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to register: Error: Validation failed",
      });
    });

    it("should return a 500 status if an unexpected error occurs during registration", async () => {
      const { req, res } = createMockReqRes({
        username: "testuser",
        email: "test@example.com",
        full_name: "Test User",
        password: "password123",
      });

      register.mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });

      await registerController(req, res);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(register).toHaveBeenCalledWith({
        username: "testuser",
        email: "test@example.com",
        full_name: "Test User",
        password: "password123",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to register: Error: Unexpected error",
      });
    });
  });

  describe("loginController", () => {
    it("should log in a user and return a 200 status", async () => {
      const { req, res } = createMockReqRes({
        username: "testuser",
        password: "password123",
      });

      login.mockResolvedValue({ token: "abcd1234" });

      await loginController(req, res);

      expect(login).toHaveBeenCalledWith("testuser", "password123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ token: "abcd1234" });
    });

    it("should return a 500 status if login fails", async () => {
      const { req, res } = createMockReqRes({
        username: "testuser",
        password: "password123",
      });

      login.mockRejectedValue(new Error("Login failed"));

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to login: Error: Login failed",
      });
    });

    it("should return a 422 status if validation fails", async () => {
      validationResult.mockReturnValueOnce({
        isEmpty: () => false,
        array: () => [{ msg: "Invalid input" }],
      });

      const { req, res } = createMockReqRes({
        username: "testuser",
        password: "password123",
      });

      await loginController(req, res);

      expect(validationResult).toHaveBeenCalledWith(req);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.send).toHaveBeenCalledWith({
        message: [{ msg: "Invalid input" }],
      });
    });

    it("should return a 500 status if validation throws an error", async () => {
      validationResult.mockImplementationOnce(() => {
        throw new Error("Validation error");
      });

      const { req, res } = createMockReqRes({
        username: "testuser",
        password: "password123",
      });

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: undefined,
      });
    });

    it("should return a 500 status if unexpected error occurs during login", async () => {
      const { req, res } = createMockReqRes({
        username: "testuser",
        password: "password123",
      });

      login.mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to login: Error: Unexpected error",
      });
    });
  });

  describe("logoutController", () => {
    it("should log out a user and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        {},
        { "x-access-token": "token123" }
      );

      logout.mockResolvedValue({ success: true });

      await logoutController(req, res);

      expect(logout).toHaveBeenCalledWith("token123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ success: true });
    });

    it("should return a 500 status if logout fails", async () => {
      const { req, res } = createMockReqRes(
        {},
        { "x-access-token": "token123" }
      );

      logout.mockRejectedValue(new Error("Logout failed"));

      await logoutController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to logout: Error: Logout failed",
      });
    });
  });

  describe("changePasswordController", () => {
    it("should change the password and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        {
          old_password: "oldpassword",
          new_password: "newpassword",
        },
        {},
        "user123"
      );

      changePassword.mockResolvedValue({ success: true });

      await changePasswordController(req, res);

      expect(changePassword).toHaveBeenCalledWith(
        "user123",
        "oldpassword",
        "newpassword"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ success: true });
    });

    it("should return a 500 status if changing password fails", async () => {
      const { req, res } = createMockReqRes(
        {
          old_password: "oldpassword",
          new_password: "newpassword",
        },
        {},
        "user123"
      );

      changePassword.mockRejectedValue(new Error("Change password failed"));

      await changePasswordController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to change password: Error: Change password failed",
      });
    });
  });

  describe("validateTokenController", () => {
    it("should validate the token and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");

      validateToken.mockResolvedValue({ valid: true });

      await validateTokenController(req, res);

      expect(validateToken).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ valid: true });
    });

    it("should return a 500 status if token validation fails", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");

      validateToken.mockRejectedValue(new Error("Token validation failed"));

      await validateTokenController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to get user: Error: Token validation failed",
      });
    });
  });
});
