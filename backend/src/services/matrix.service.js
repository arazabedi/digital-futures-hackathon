import db from "../models/index.js";

const Matrix = db.matrix;

export const addMatrixEntry = async (matrixData) => {
  try {
    const newMatrixEntry = new Matrix(matrixData);
    await newMatrixEntry.save();
    return { message: "Matrix entry added successfully" };
  } catch (error) {
    throw new Error("Error adding matrix entry");
  }
};

export const getMatrixEntriesByModelId = async (modelId) => {
  try {
    const entries = await Matrix.find({ modelId });
    return entries;
  } catch (error) {
    throw new Error("Error fetching matrix entries");
  }
};

export const updateMatrixEntryById = async (entryId, updateData) => {
  try {
    const updatedEntry = await Matrix.findByIdAndUpdate(entryId, updateData, {
      new: true,
    });
    return updatedEntry;
  } catch (error) {
    throw new Error("Error updating matrix entry");
  }
};

export const deleteMatrixEntryById = async (entryId) => {
  try {
    await Matrix.findByIdAndDelete(entryId);
    return { message: "Matrix entry deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting matrix entry");
  }
};
