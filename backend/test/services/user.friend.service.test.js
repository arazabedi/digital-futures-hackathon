import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import {
  removeFriend,
  getAllFriends,
  getAllFriendWeightLogs,
  getNameFromId,
  becomeFriends,
  sendFriendRequest,
  deleteFriendRequest,
  getSentFriendRequests,
} from "../../src/services/user.friend.service.js";
import {
  getWeightLog,
  getNameFromId,
  getUsernameFromId,
} from "../../src/services/user.service.js";
import User from "../../src/models/user.model.js";
import { getAllFriendWeightLogs } from "../../src/services/user.friend.service.js";

describe("User friend service tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  beforeEach(() => {
    vi.mock("./../../src/models/user.model.js", () => {
      return {
        default: vi.fn(),
      };
    });
    vi.mock("../../src/services/user.service.js", () => ({
      getWeightLog: vi.fn(),
      getNameFromId: vi.fn(),
      getUsernameFromId: vi.fn(),
    }));
  });

  User.findOne = vi.fn();

  describe("getAllFriends", () => {
    it("should return all friends when given a valid userId", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      const friends = await getAllFriends(userId);

      expect(friends).toEqual(["friend1", "friend2"]);
    });
  });
  it("should throw an error when getting the friends array fails", async () => {
    await expect(getAllFriends()).rejects.toThrowError();
  });

  describe("removeFriend", () => {
    it("should remove a friend from the friends array", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
        save: vi.fn(),
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      await removeFriend(userId, "friend2");
      expect(mockUser.save).toBeCalled();
      expect(mockUser.friends).toEqual(["friend1"]);
    });
    it("should throw an error if friend is not found", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      const mockExec = vi.fn().mockResolvedValue(mockUser);
      User.findOne.mockReturnValue({ exec: mockExec });

      const userId = "666a1aa8024c522d8a3692f3";
      await expect(removeFriend(userId, "friend3")).rejects.toThrowError();
    });
  });
  describe("becomeFriends", () => {
    it("should add senderId to receiverId's friend list and remove receiverId from senderId's sent requests list", async () => {
      const mockSender = {
        _id: "senderId",
        friends: [],
        sent_requests: new Set(["receiverId"]),
        save: vi.fn().mockResolvedValue(),
      };
      const mockSenderExec = vi.fn().mockResolvedValue(mockSender);
      User.findOne.mockReturnValue({ exec: mockSenderExec });

      const mockReceiver = {
        _id: "receiverId",
        friends: [],
        friend_requests: new Set(["senderId"]),
        save: vi.fn().mockResolvedValue(),
      };
      const mockReceiverExec = vi.fn().mockResolvedValue(mockReceiver);
      User.findOne
        .mockReturnValueOnce({ exec: mockSenderExec })
        .mockReturnValueOnce({ exec: mockReceiverExec });

      await becomeFriends("senderId", "receiverId");

      expect(mockSender.friends).toEqual(["receiverId"]);
      expect(mockSender.sent_requests.has("receiverId")).toBe(false);
      expect(mockReceiver.friends).toEqual(["senderId"]);
      expect(mockReceiver.friend_requests.has("senderId")).toBe(false);
      expect(mockSender.save).toBeCalled();
      expect(mockReceiver.save).toBeCalled();
      expect(User.findOne).toBeCalledTimes(2);
    });

    it("should throw an error if an error occurs during the process", async () => {
      const mockError = new Error("Database error");
      User.findOne.mockRejectedValueOnce(mockError);

      await expect(
        becomeFriends("senderId", "receiverId")
      ).rejects.toThrowError();
    });
  });

  describe("sendFriendRequest", () => {
    it("should send a friend request between two users", async () => {
      const userId = "123sender";
      const friendId = "456receiver";

      const senderUser = {
        _id: userId,
        sent_requests: [],
        save: vi.fn(),
      };
      const friendUser = {
        _id: friendId,
        friend_requests: [],
        save: vi.fn(),
      };

      const mockSenderExec = vi.fn().mockResolvedValue(senderUser);
      const mockFriendExec = vi.fn().mockResolvedValue(friendUser);

      User.findOne.mockImplementation((query) => {
        if (query._id === userId) {
          return { exec: mockSenderExec };
        } else if (query._id === friendId) {
          return { exec: mockFriendExec };
        }
      });

      await sendFriendRequest(userId, friendId);

      // Assertions
      expect(senderUser.sent_requests).toContain(friendId);
      expect(senderUser.save).toBeCalled();

      expect(friendUser.friend_requests).toContain(userId);
      expect(friendUser.save).toBeCalled();
    });

    it("should throw an error if the request has already been sent", async () => {
      const userId = "123sender";
      const friendId = "456receiver";

      // Mock user instances and their methods
      const senderUser = {
        _id: userId,
        sent_requests: [friendId], // Simulate existing request
      };

      const mockSenderExec = vi.fn().mockResolvedValue(senderUser);

      // Mock User.findOne to return mocked user instance
      User.findOne.mockReturnValue({ exec: mockSenderExec });

      await expect(sendFriendRequest(userId, friendId)).rejects.toThrowError(
        "Request already sent"
      );
    });

    it("should throw an error if user lookup fails", async () => {
      const userId = "123sender";
      const friendId = "456receiver";

      User.findOne.mockReturnValue({
        exec: vi.fn().mockRejectedValue(new Error("User not found")),
      });

      await expect(sendFriendRequest(userId, friendId)).rejects.toThrowError(
        "Error sending friend request"
      );
    });

    it("should throw an error if friend lookup fails", async () => {
      const userId = "123sender";
      const friendId = "456receiver";

      const senderUser = {
        _id: userId,
        sent_requests: [],
      };

      const mockSenderExec = vi.fn().mockResolvedValue(senderUser);

      User.findOne.mockImplementation((query) => {
        if (query._id === userId) {
          return { exec: mockSenderExec };
        } else if (query._id === friendId) {
          return {
            exec: vi.fn().mockRejectedValue(new Error("Friend not found")),
          };
        }
      });

      await expect(sendFriendRequest(userId, friendId)).rejects.toThrowError(
        "Error sending friend request"
      );
    });
  });

  describe("deleteFriendRequest", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it.skip("should delete a friend request from user's friend_requests array", async () => {
      const userId = "123user";
      const requestId = "456request";

      const user = {
        _id: userId,
        friend_requests: [requestId],
        save: vi.fn(),
      };

      const mockUserExec = vi.fn().mockResolvedValue(user);

      // Mock User.findOne to return mocked user instance
      User.findOne.mockReturnValue({ exec: mockUserExec });

      await deleteFriendRequest(userId, requestId);

      // Assertions
      expect(user.friend_requests).not.toContain(requestId);
      expect(user.save).toBeCalled();
    });

    it("should throw an error if user lookup fails", async () => {
      const userId = "123user";
      const requestId = "456request";

      // Mock User.findOne to throw an error
      User.findOne.mockReturnValue({
        exec: vi.fn().mockRejectedValue(new Error("User not found")),
      });

      await expect(deleteFriendRequest(userId, requestId)).rejects.toThrowError(
        "Error deleting friend request"
      );
    });

    it("should throw an error if request deletion fails", async () => {
      const userId = "123user";
      const requestId = "456request";

      // Mock user instance and its methods
      const user = {
        _id: userId,
        friend_requests: [requestId],
        save: vi.fn().mockRejectedValue(new Error("Failed to save user")),
      };

      const mockUserExec = vi.fn().mockResolvedValue(user);

      // Mock User.findOne to return mocked user instance
      User.findOne.mockReturnValue({ exec: mockUserExec });

      await expect(deleteFriendRequest(userId, requestId)).rejects.toThrowError(
        "Error deleting friend request"
      );
    });

    it.skip("should not throw an error if requestId not found in friend_requests", async () => {
      const userId = "123user";
      const requestId = "456request";

      const user = {
        _id: userId,
        friend_requests: [],
        save: vi.fn(),
      };

      const mockUserExec = vi.fn().mockResolvedValue(user);

      User.findOne.mockReturnValue({ exec: mockUserExec });

      await deleteFriendRequest(userId, requestId);

      expect(user.friend_requests).not.toContain(requestId);
      expect(user.save).toBeCalled();
    });
  });

	describe("getSentFriendRequests", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should return the sent friend requests array for the user", async () => {
      const userId = "123user";
      const sentRequests = ["friend1", "friend2"];

      const user = {
        _id: userId,
        sent_requests: sentRequests,
      };

      const mockUserExec = vi.fn().mockResolvedValue(user);

      User.findOne.mockReturnValue({ exec: mockUserExec });

      const result = await getSentFriendRequests(userId);

      expect(result).toEqual(sentRequests);
    });

    it("should throw an error if user lookup fails", async () => {
      const userId = "123user";

      User.findOne.mockReturnValue({
        exec: vi.fn().mockRejectedValue(new Error("User not found")),
      });

      await expect(getSentFriendRequests(userId)).rejects.toThrowError(
        "Error getting sent friend request"
      );
    });
  });

  describe("getAllFriendWeightLogs", () => {
    it("should return an array of friend weight logs when given a valid userId", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      const mockGetWeightLog = vi.fn().mockResolvedValue("weightLog");
      const mockGetNameFromId = vi.fn().mockResolvedValue("friendName");
      const mockGetUsernameFromId = vi.fn().mockResolvedValue("friendUsername");
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser),
      });
      getWeightLog.mockReturnValue(mockGetWeightLog);
      getNameFromId.mockReturnValue(mockGetNameFromId);
      getUsernameFromId.mockReturnValue(mockGetUsernameFromId);
      const userId = "666a1aa8024c522d8a3692f3";
      const friendWeightLogs = await getAllFriendWeightLogs(userId);
      expect(friendWeightLogs).toEqual([
        {
          friend_id: "friend1",
          friend_username: expect.any(Function),
          friend_name: expect.any(Function),
          weight_log: expect.any(Function),
        },
        {
          friend_id: "friend2",
          friend_username: expect.any(Function),
          friend_name: expect.any(Function),
          weight_log: expect.any(Function),
        },
      ]);
      expect(User.findOne).toBeCalledWith({ _id: userId });
      expect(getWeightLog).toBeCalledTimes(2);
      expect(getNameFromId).toBeCalledTimes(2);
      expect(getUsernameFromId).toBeCalledTimes(2);
    });

    it("should throw an error when getting the user fails", async () => {
      User.findOne.mockReturnValue({
        exec: vi.fn().mockRejectedValue(new Error("User not found")),
      });
      await expect(
        getAllFriendWeightLogs("invalidUserId")
      ).rejects.toThrowError("User not found");
    });

    it("should throw an error when getting the friend weight log fails", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser),
      });
      getWeightLog.mockRejectedValue(new Error("Failed to get weight log")); // Update the mock implementation to return a rejected promise
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(getAllFriendWeightLogs(userId)).rejects.toThrowError(
        "Failed to get weight log"
      );
    });

    it.skip("should throw an error when getting the friend name fails", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      const mockGetWeightLog = vi.fn().mockResolvedValue("weightLog");
      const mockGetNameFromId = vi
        .fn()
        .mockRejectedValue(new Error("Failed to get friend name"));
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser),
      });
      getWeightLog.mockReturnValue(mockGetWeightLog);
      getNameFromId.mockReturnValue(mockGetNameFromId);
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(getAllFriendWeightLogs(userId)).rejects.toThrowError(
        "Failed to get friend name"
      );
    });

    it.skip("should throw an error when getting the friend username fails", async () => {
      const mockUser = {
        friends: ["friend1", "friend2"],
      };
      const mockGetWeightLog = vi.fn().mockResolvedValue("weightLog");
      const mockGetNameFromId = vi.fn().mockResolvedValue("friendName");
      const mockGetUsernameFromId = vi
        .fn()
        .mockRejectedValue(new Error("Failed to get friend username"));
      User.findOne.mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockUser),
      });
      getWeightLog.mockReturnValue(mockGetWeightLog);
      getNameFromId.mockReturnValue(mockGetNameFromId);
      getUsernameFromId.mockReturnValue(mockGetUsernameFromId);
      const userId = "666a1aa8024c522d8a3692f3";
      await expect(getAllFriendWeightLogs(userId)).rejects.toThrowError(
        "Failed to get friend username"
      );
    });
  });
});
