// import mongoose from "mongoose";
import {
  addMatrixEntry,
  getMatrixEntriesByModelId,
  updateMatrixEntryById,
  deleteMatrixEntryById,
} from "../services/matrix.service.js";

export const addMatrixEntryController = async (req, res) => {
  try {
    const matrixData = req.body;
    const response = await addMatrixEntry(matrixData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getMatrixEntriesByModelIdController = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    const entries = await getMatrixEntriesByModelId(modelId);
    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateMatrixEntryController = async (req, res) => {
  try {
    const entryId = req.params.id;
    const updateData = req.body;
    const updatedEntry = await updateMatrixEntryById(entryId, updateData);
    res.status(200).send(updatedEntry);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteMatrixEntryController = async (req, res) => {
  try {
    const entryId = req.params.id;
    const response = await deleteMatrixEntryById(entryId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
