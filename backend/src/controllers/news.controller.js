import {
  getAllNews,
  addNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
  getRelatedNewsByModelName,
} from "../services/news.service.js";

export const getAllNewsController = async (req, res) => {
  try {
    const news = await getAllNews();
    res.status(200).send(news);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getRelatedNewsByModelNameController = async (req, res) => {
  try {
    const modelName = req.params.name;
    const relatedNews = await getRelatedNewsByModelName(modelName);
    res.status(200).send(relatedNews);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const addNewsController = async (req, res) => {
  try {
    const newsData = req.body;
    const response = await addNews(newsData);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getNewsByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await getNewsById(id);
    res.status(200).send(news);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateNewsByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateNewsById(id, updatedData);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteNewsByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await deleteNewsById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
