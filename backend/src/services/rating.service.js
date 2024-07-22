import mongoose from "mongoose";
import db from "../models/index.js";

const Rating = db.rating;

export const addRating = async (ratingData) => {
  try {
    const newRating = new Rating(ratingData);
    await newRating.save();
    return { message: "Rating added successfully" };
  } catch (error) {
    throw new Error("Error adding rating");
  }
};

export const getRatingsByModelId = async (modelId) => {
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
