import {
  getAllLlmModels,
  addLlmModel,
  getLlmModelById,
  updateLlmModelById,
  deleteLlmModelById,
} from "../services/llmModel.service.js";

export const getAllLlmModelsController = async (req, res) => {
  try {
    const models = await getAllLlmModels();
    res.status(200).send(models);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const addLlmModelController = async (req, res) => {
  try {
    const modelData = req.body;
    const response = await addLlmModel(modelData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getLlmModelByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const model = await getLlmModelById(id);
    res.status(200).send(model);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateLlmModelByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateLlmModelById(id, updatedData);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteLlmModelByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await deleteLlmModelById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
