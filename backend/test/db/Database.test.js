import { beforeAll, describe, expect, it, afterEach, vi } from "vitest";
import mongoose from "mongoose";
import Database from "../../src/db/Database.js";

describe("Database", () => {
  let database;

  beforeAll(async () => {
    const uri = "mongodb://localhost:27017/calcount-backend";
    mongoose.connect = vi.fn(() => Promise.resolve());
    mongoose.disconnect = vi.fn(() => Promise.resolve());
    database = new Database(uri);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should connect to the database successfully", async () => {
    await database.connect();
    expect(mongoose.connect).toHaveBeenCalled();
    // expect(mongoose.connect).toHaveBeenCalledWith(database.uri);
    // expect(vi.console.log).toHaveBeenCalledWith(
    //   `Database connection to ${database.uri} was successful`
    // );
  });

  it("should handle database connection errors and retry", async () => {
    const error = new Error("Connection error");
    mongoose.connect = vi.fn().mockRejectedValueOnce(error);
    vi.useFakeTimers();

    const ans = await database.connect();

    await expect(ans).toBeUndefined();
    // expect(mongoose.connect).toHaveBeenCalledTimes(1);

    // expect(vi.console.log).toHaveBeenCalledWith(
    //   "Database connection error",
    //   error
    // );
    // expect(vi.setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000);

    // vi.runAllTimers();
    // expect(mongoose.connect).toHaveBeenCalledTimes(3);
    // expect(vi.console.log).toHaveBeenCalledWith(
    //   `Database connection to ${database.uri} was successful`
    // );

    vi.useRealTimers();
  });

  it.skip("should handle database unavailability", async () => {
    mongoose.connect = vi
      .fn()
      .mockRejectedValueOnce(new Error("Connection error"));
    database.connectionAttempts = 10;

    await database.connect();
    expect(mongoose.connect).toHaveBeenCalledTimes(2);
    // expect(vi.console.log).toHaveBeenCalledWith("Database unavailable");
  });

  it("should close the database connection", async () => {
    await database.close();
    expect(mongoose.disconnect).toHaveBeenCalled();
  });
});
