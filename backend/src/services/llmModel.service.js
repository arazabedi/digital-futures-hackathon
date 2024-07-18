import db from "../models/index.js";

const Model = db.model;

export const getAllLlmModels = async () => {
  try {
    const models = await Model.find();
    return models;
  } catch (error) {
    throw new Error("Error fetching LLM models");
  }
};

export const addLlmModel = async (modelData) => {
  try {
    const newModel = new Model(modelData);
    await newModel.save();
    return { message: "LLM model added successfully" };
  } catch (error) {
    throw new Error("Error adding LLM model");
  }
};

export const getLlmModelById = async (id) => {
  try {
    const model = await Model.findById(id);
    if (!model) {
      throw new Error("LLM model not found");
    }
    return model;
  } catch (error) {
    throw new Error("Error fetching LLM model by ID");
  }
};

export const updateLlmModelById = async (id, updatedData) => {
  try {
    const model = await Model.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!model) {
      throw new Error("LLM model not found");
    }
    return { message: "LLM model updated successfully", updatedModel: model };
  } catch (error) {
    throw new Error("Error updating LLM model");
  }
};

export const deleteLlmModelById = async (id) => {
  try {
    const model = await Model.findByIdAndDelete(id);
    if (!model) {
      throw new Error("LLM model not found");
    }
    return { message: "LLM model deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting LLM model");
  }
};
