import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import {
  logWeight,
  getWeightLog,
  getUsernameFromId,
  getAllUsers,
  getNameFromId,
} from "../../src/services/user.service.js";
import User from "../../src/models/user.model.js";

describe("User service tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  beforeEach(() => {
    vi.mock("./../../src/models/user.model.js", () => {
      return {
        default: vi.fn(),
      };
    });
  });

  User.findOne = vi.fn();

  describe("logWeight", () => {
    it("should add a log object to the weight log", async () => {
      const testDate = new Date();
      const testDate2 = new Date(testDate.getTime() + 5 * 24 * 60 * 60 * 1000);
      const testDate3 = new Date(testDate2.getTime() + 5 * 24 * 60 * 60 * 1000);

      const testWeightLog = [
        { weight: 97.2, date: testDate },
        { weight: 97.4, date: testDate2 },
      ];
      const mockUser = {
        weight_log: testWeightLog,
        save: vi.fn(),
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const logObject = {
        weight: 93.7,
        date: testDate3,
      };

      const userId = "666a1aa8024c522d8a3692f3";
      await logWeight(userId, logObject);

      expect(mockUser.save).toBeCalled();
      expect(mockUser.weight_log).toContain(logObject);
    });
    it("should throw an error when a user is not found", async () => {
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });
      const testDate = new Date();
      const userId = "666a1aa8024c522d8a3692f3";
      const logObject = {
        weight: 90.5,
        date: testDate,
      };
      await expect(() => logWeight(userId, logObject)).rejects.toThrowError();
    });
    it("should throw an error when there is a problem with saving to the database", async () => {
      const testDate = new Date();
      const userId = "666a1aa8024c522d8a3692f3";
      const logObject = {
        weight: 90.5,
        date: testDate,
      };
      await expect(() => logWeight(userId, logObject)).rejects.toThrowError();
    });
  });

  describe("getWeightLog", () => {
    it("should return the weight log for the given user id", async () => {
      const mockUser = {
        weight_log: { weight: 97.2, date: new Date() },
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      const result = await getWeightLog(userId);

      expect(User.findOne).toBeCalled();
      expect(result).toStrictEqual(mockUser.weight_log);
    });
    it("should throw an error when no user is found", async () => {
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(() => getWeightLog(userId)).rejects.toThrowError();
    });
  });

  describe("getNameFromId", () => {
    it("should return the user's full name when the user is found", async () => {
      const mockUser = {
        full_name: "John Doe",
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });
      const userId = "666a1aa8024c522d8a3692f3";
      const result = await getNameFromId(userId);
      expect(User.findOne).toBeCalledWith({ _id: userId });
      expect(result).toBe(mockUser.full_name);
    });

    it("should throw an error when no user is found", async () => {
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(() => getNameFromId(userId)).rejects.toThrowError(
        "Error getting user's full name: TypeError: Cannot read properties of null (reading 'full_name')"
      );
    });

    it("should throw an error when there is a problem with executing the query", async () => {
      const mockExec = vi.fn().mockRejectedValue(new Error("Database error"));
      User.findOne.mockReturnValue({ exec: mockExec });
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(() => getNameFromId(userId)).rejects.toThrowError(
        "Error getting user's full name: Error: Database error"
      );
    });
  });

  describe("getUsernameFromId", () => {
    it("should return the username when user is found", async () => {
      const mockUser = {
        username: "testuser",
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      const result = await getUsernameFromId(userId);

      expect(User.findOne).toBeCalledWith({ _id: userId });
      expect(result).toBe(mockUser.username);
    });

    it("should throw an error when no user is found", async () => {
      const mockExec = vi.fn().mockResolvedValue(null);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      await expect(() => getUsernameFromId(userId)).rejects.toThrowError();
    });

    it("should throw an error when there is a problem with executing the query", async () => {
      const mockExec = vi.fn().mockRejectedValue(new Error("Database error"));
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      await expect(() => getUsernameFromId(userId)).rejects.toThrowError(
        "Error getting details from id:Error: Database error"
      );
    });
  });

  // describe("getAllUsers", () => {
  //   it("should return all users when users are found", async () => {
  //     const mockUsers = [{ username: "user1" }, { username: "user2" }];
  //     const mockExec = vi.fn().mockResolvedValue(mockUsers);
  //     User.find.mockReturnValue({ exec: mockExec });

  //     const result = await getAllUsers();

  //     expect(User.find).toBeCalled();
  //     expect(result).toEqual(mockUsers);
  //   });

  //   it("should throw an error when no users are found", async () => {
  //     const mockExec = vi.fn().mockResolvedValue(null);
  //     User.find.mockReturnValue({ exec: mockExec });

  //     await expect(() => getAllUsers()).rejects.toThrowError();
  //   });

  //   it("should throw an error when there is a problem with executing the query", async () => {
  //     const mockExec = vi.fn().mockRejectedValue(new Error("Database error"));
  //     User.find.mockReturnValue({ exec: mockExec });

  //     await expect(() => getAllUsers()).rejects.toThrowError(
  //       "Error retrieving users: Error: Database error"
  //     );
  //   });
  // });
});
