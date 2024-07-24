import mongoose from "mongoose";
import { addRating, getRatingByModelId } from "../services/rating.service.js";

export const addRatingController = async (req, res) => {
  try {
    const { modelId, ...ratingData } = req.body;

    if (!modelId) {
      return res.status(400).send({ error: "Model ID is required" });
    }

    const response = await addRating(modelId, ratingData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getRatingByModelIdController = async (req, res) => {
  try {
    const modelId = req.params.modelId.trim();
    if (!modelId || !mongoose.Types.ObjectId.isValid(modelId)) {
      return res.status(400).send({ error: "Invalid model ID" });
    }
    const ratings = await getRatingByModelId(modelId);
    res.status(200).send(ratings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
