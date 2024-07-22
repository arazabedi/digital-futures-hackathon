import mongoose from "mongoose";
import { addRating, getRatingsByModelId } from "../services/rating.service.js";

export const addRatingController = async (req, res) => {
  try {
    const ratingData = req.body;
    const response = await addRating(ratingData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getRatingsByModelIdController = async (req, res) => {
  try {
    const modelId = req.params.modelId.trim();
    if (!modelId || !mongoose.Types.ObjectId.isValid(modelId)) {
      return res.status(400).send({ error: "Invalid model ID" });
    }
    const ratings = await getRatingsByModelId(modelId);
    res.status(200).send(ratings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
