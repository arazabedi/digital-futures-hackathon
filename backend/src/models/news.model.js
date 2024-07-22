import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  source: {
    id: { type: String, default: null },
    name: { type: String, required: true },
  },
  author: { type: String, default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, default: null },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});

const News = mongoose.model("news-data", NewsSchema);

export default News;
