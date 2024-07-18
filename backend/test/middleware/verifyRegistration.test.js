// import * as db from "../../src/models/index"; // Importing all exports from models/index
import verifyRegistration from "../../src/middleware/verifyRegistration";
import User from "../../src/models/user.model";

describe("checkDuplicateUsernameOrEmail", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
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

  it("should call next() if username and email are not in use", async () => {
    User.findOne = vi.fn();
    const mockExec = vi.fn().mockResolvedValue(null);
    User.findOne.mockReturnValue({ exec: mockExec });

    await verifyRegistration.checkDuplicateUsernameOrEmail(req, res, next);

    expect(User.findOne).toHaveBeenCalledTimes(2);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should send 400 status with message if username is already in use", async () => {
    User.findOne = vi.fn();
    const mockExec = vi.fn().mockResolvedValue({ username: "testuser" });
    User.findOne.mockReturnValue({ exec: mockExec });

    await verifyRegistration.checkDuplicateUsernameOrEmail(req, res, next);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Failed! Username is already in use!",
    });
    expect(next).not.toHaveBeenCalled();
  });
  it("should send 500 status if there is a server error", async () => {
    User.findOne = vi.fn();
    const mockExec = vi.fn().mockRejectedValue(new Error());
    User.findOne.mockReturnValue({ exec: mockExec });

    await verifyRegistration.checkDuplicateUsernameOrEmail(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(next).not.toHaveBeenCalled();
  });

  it("should send 400 status with message if email is already in use", async () => {
    User.findOne = vi.fn();
    const mockExec = vi
      .fn()
      .mockResolvedValueOnce(null)
			.mockResolvedValueOnce({ email: "test@example.com" });

    User.findOne.mockReturnValue({ exec: mockExec });

    await verifyRegistration.checkDuplicateUsernameOrEmail(req, res, next);

    expect(User.findOne).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Failed! Email already in use",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
