import db from "../models/index.js";

const News = db.news;

export const getAllNews = async () => {
  try {
    const news = await News.find();
    return news;
  } catch (error) {
    throw new Error("Error fetching news data");
  }
};

export const getRelatedNewsByModelName = async (modelName) => {
  try {
    const relatedNews = await News.find({
      description: { $regex: modelName, $options: "i" },
    });
    return relatedNews;
  } catch (error) {
    throw new Error("Error fetching related news");
  }
};

export const addNews = async (newsData) => {
  try {
    const newNews = new News(newsData);
    await newNews.save();
    return { message: "News data added successfully" };
  } catch (error) {
    throw new Error("Error adding news data");
  }
};

export const getNewsById = async (id) => {
  try {
    const news = await News.findById(id);
    if (!news) {
      throw new Error("News data not found");
    }
    return news;
  } catch (error) {
    throw new Error("Error fetching news data by ID");
  }
};

export const updateNewsById = async (id, updatedData) => {
  try {
    const news = await News.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!news) {
      throw new Error("News data not found");
    }
    return { message: "News data updated successfully", updatedNews: news };
  } catch (error) {
    throw new Error("Error updating news data");
  }
};

export const deleteNewsById = async (id) => {
  try {
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      throw new Error("News data not found");
    }
    return { message: "News data deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting news data");
  }
};
