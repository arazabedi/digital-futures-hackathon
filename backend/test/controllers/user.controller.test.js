import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllUsersController,
  logWeightController,
  getWeightLogController,
  searchForFriendsController,
  sendFriendRequestController,
  acceptFriendRequestController,
  removeFriendController,
  getFriendRequestsController,
  getSentFriendRequestsController,
  getAllFriendWeightLogsController,
} from '../../src/controllers/user.controller.js';
import {
  logWeight,
  getWeightLog,
  getAllUsers,
} from '../../src/services/user.service.js';
import {
  getAllFriends,
  becomeFriends,
  removeFriend,
  sendFriendRequest,
  deleteFriendRequest,
  getFriendRequests,
  getSentFriendRequests,
  getAllFriendWeightLogs,
} from '../../src/services/user.friend.service.js';

// Mock the service functions using vi.fn()
vi.mock('../../src/services/user.service.js', () => ({
  logWeight: vi.fn(),
  getWeightLog: vi.fn(),
  getAllUsers: vi.fn(),
}));

vi.mock('../../src/services/user.friend.service.js', () => ({
  getAllFriends: vi.fn(),
  becomeFriends: vi.fn(),
  removeFriend: vi.fn(),
  sendFriendRequest: vi.fn(),
  deleteFriendRequest: vi.fn(),
  getFriendRequests: vi.fn(),
  getSentFriendRequests: vi.fn(),
  getAllFriendWeightLogs: vi.fn(),
}));

const createMockReqRes = (body = {}, headers = {}, userId = null, query = {}) => {
  const req = {
    body,
    headers,
    userId,
    query,
  };
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  };
  return { req, res };
};

describe("User Controllers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllUsersController", () => {
    it("should return all users with a 200 status", async () => {
      const { req, res } = createMockReqRes();
      const users = [{ id: 1, name: "John" }];
      getAllUsers.mockResolvedValue(users);

      await getAllUsersController(req, res);

      expect(getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return a 500 status if an error occurs", async () => {
      const { req, res } = createMockReqRes();
      getAllUsers.mockRejectedValue(new Error("Error fetching users"));

      await getAllUsersController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error fetching users" });
    });
  });

  describe("logWeightController", () => {
    it("should log weight and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        { logObject: { weight: 70 } },
        {},
        "user123"
      );

      await logWeightController(req, res);

      expect(logWeight).toHaveBeenCalledWith("user123", { weight: 70 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: "Weight logged successfully",
      });
    });

    it("should return a 500 status if logging weight fails", async () => {
      const { req, res } = createMockReqRes(
        { logObject: { weight: 70 } },
        {},
        "user123"
      );
      logWeight.mockRejectedValue(new Error("Logging weight failed"));

      await logWeightController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to log weight: Error: Logging weight failed",
      });
    });
  });

  describe("getWeightLogController", () => {
    it("should get weight log and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      const weightLog = [{ weight: 70, date: "2023-01-01" }];
      getWeightLog.mockResolvedValue(weightLog);

      await getWeightLogController(req, res);

      expect(getWeightLog).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(weightLog);
    });

    it("should return a 500 status if getting weight log fails", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      getWeightLog.mockRejectedValue(new Error("Getting weight log failed"));

      await getWeightLogController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to get weight log",
      });
    });
  });

  describe("searchForFriendsController", () => {
    it("should search for friends and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, null, { params: "john" });
      const users = [
        {
          _id: "1",
          full_name: { first_name: "John", last_name: "Doe" },
          username: "johndoe",
          email: "john@example.com",
        },
      ];
      getAllUsers.mockResolvedValue(users);

      await searchForFriendsController(req, res);

      const expectedUsers = [
        {
          _id: "1",
          full_name: { first_name: "John", last_name: "Doe" },
          username: "johndoe",
          email: "john@example.com",
        },
      ];

      expect(getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });

    it("should return a 500 status if searching for friends fails", async () => {
      const { req, res } = createMockReqRes({}, {}, null, { params: "john" });
      getAllUsers.mockRejectedValue(new Error("Searching for friends failed"));

      await searchForFriendsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Searching for friends failed",
      });
    });
  });

  describe("sendFriendRequestController", () => {
    it("should send a friend request and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        { request_id: "friend123" },
        {},
        "user123"
      );

      await sendFriendRequestController(req, res);

      expect(sendFriendRequest).toHaveBeenCalledWith("user123", "friend123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Friend request sent" });
    });

    it("should return a 500 status if sending friend request fails", async () => {
      const { req, res } = createMockReqRes(
        { request_id: "friend123" },
        {},
        "user123"
      );
      sendFriendRequest.mockRejectedValue(
        new Error("Sending friend request failed")
      );

      await sendFriendRequestController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error:
          "Failed to send friend request Error: Sending friend request failed",
      });
    });
  });

  describe("acceptFriendRequestController", () => {
    it("should accept a friend request and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        { request_id: "friend123" },
        {},
        "user123"
      );

      await acceptFriendRequestController(req, res);

      expect(becomeFriends).toHaveBeenCalledWith("friend123", "user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Friend added successfully",
      });
    });

    it("should return a 500 status if accepting friend request fails", async () => {
      const { req, res } = createMockReqRes(
        { request_id: "friend123" },
        {},
        "user123"
      );
      becomeFriends.mockRejectedValue(
        new Error("Accepting friend request failed")
      );

      await acceptFriendRequestController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error:
          "Failed to accept friend request Error: Accepting friend request failed",
      });
    });
  });

  describe("removeFriendController", () => {
    it("should remove a friend and return a 200 status", async () => {
      const { req, res } = createMockReqRes(
        { friend_id: "friend123" },
        {},
        "user123"
      );

      await removeFriendController(req, res);

      expect(removeFriend).toHaveBeenCalledWith("user123", "friend123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Friend removed successfully",
      });
    });

    it("should return a 500 status if removing friend fails", async () => {
      const { req, res } = createMockReqRes(
        { friend_id: "friend123" },
        {},
        "user123"
      );
      removeFriend.mockRejectedValue(new Error("Removing friend failed"));

      await removeFriendController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error: "Failed to remove friend request Error: Removing friend failed",
      });
    });
  });

  describe("getFriendRequestsController", () => {
    it("should get friend requests and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      const friendRequests = [{ id: "1", name: "Jane Doe" }];
      getFriendRequests.mockResolvedValue(friendRequests);

      await getFriendRequestsController(req, res);

      expect(getFriendRequests).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(friendRequests);
    });

    it("should return a 500 status if getting friend requests fails", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      getFriendRequests.mockRejectedValue(
        new Error("Getting friend requests failed")
      );

      await getFriendRequestsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error:
          "Failed to get friend requestsError: Getting friend requests failed",
      });
    });
  });

  describe("getSentFriendRequestsController", () => {
    it("should get sent friend requests and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      const sentRequests = [{ id: "2", name: "John Doe" }];
      getSentFriendRequests.mockResolvedValue(sentRequests);

      await getSentFriendRequestsController(req, res);

      expect(getSentFriendRequests).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(sentRequests);
    });

    it("should return a 500 status if getting sent friend requests fails", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      getSentFriendRequests.mockRejectedValue(
        new Error("Getting sent friend requests failed")
      );

      await getSentFriendRequestsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error:
          "Failed to get sent friend requestError: Getting sent friend requests failed",
      });
    });
  });

  describe("getAllFriendWeightLogsController", () => {
    it("should get all friend weight logs and return a 200 status", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      const weightLogs = [{ id: "3", weight: 70 }];
      getAllFriendWeightLogs.mockResolvedValue(weightLogs);

      await getAllFriendWeightLogsController(req, res);

      expect(getAllFriendWeightLogs).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(weightLogs);
    });

    it("should return a 500 status if getting all friend weight logs fails", async () => {
      const { req, res } = createMockReqRes({}, {}, "user123");
      getAllFriendWeightLogs.mockRejectedValue(
        new Error("Getting all friend weight logs failed")
      );

      await getAllFriendWeightLogsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        error:
          "Failed to get sent friend requestError: Getting all friend weight logs failed",
      });
    });
  });
});
