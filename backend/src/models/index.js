import mongoose from "mongoose";
import User from "./user.model.js";
import Model from "./llmModel.model.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;

db.model = Model;

export default db;
