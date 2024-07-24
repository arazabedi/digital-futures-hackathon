import mongoose from "mongoose";
import db from "../models/index.js";

const Rating = db.rating;

export const addRating = async (modelId, ratingData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
      throw new Error("Invalid model ID format");
    }

    await Rating.deleteMany({ modelId });

    const newRating = new Rating({ ...ratingData, modelId });
    await newRating.save();

    return { message: "Rating added successfully" };
  } catch (error) {
    throw new Error(`Error adding rating: ${error.message}`);
  }
};

export const getRatingByModelId = async (modelId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
      throw new Error("Invalid model ID format");
    }
    const ratings = await Rating.find({ modelId }).populate(
      "userId",
      "username"
    );
    if (!ratings || ratings.length === 0) {
      throw new Error("No ratings found for this model");
    }
    return ratings;
  } catch (error) {
    throw new Error(`Error fetching ratings: ${error.message}`);
  }
};
