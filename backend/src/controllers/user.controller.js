import { getAllUsers } from "../services/user.service.js";

export const getAllUsersController = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
