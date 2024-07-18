import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";

const User = db.user;

export const register = async (userData) => {
  try {
    const user = new User({
      username: userData.username,
      email: userData.email,
      full_name: userData.full_name,
      password: bcrypt.hashSync(userData.password, 8),
      role: userData.role || "customer",
    });
    await user.save();
    return { message: "User " + user.username + " registered successfully" };
  } catch (error) {
    throw new Error("Error registering user");
  }
};

export const login = async (username, password) => {
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid username/password combination");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: 86400,
      }
    );
    return {
      id: user._id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      accessToken: token,
    };
  } catch (error) {
    throw new Error("Error logging in user");
  }
};

export const validateToken = async (userId) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user._id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    throw new Error("Error validating token");
  }
};

export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid password");
    }

    user.password = await bcrypt.hash(newPassword, 8);
    await user.save();

    return { message: "Successfully changed password" };
  } catch (error) {
    throw new Error("Error changing password");
  }
};
