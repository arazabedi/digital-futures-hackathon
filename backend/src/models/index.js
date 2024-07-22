import mongoose from "mongoose";
import User from "./user.model.js";
import Model from "./llmModel.model.js";
import News from "./news.model.js";
import Rating from "./rating.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;

db.model = Model;

db.news = News;

db.rating = Rating;

export default db;
