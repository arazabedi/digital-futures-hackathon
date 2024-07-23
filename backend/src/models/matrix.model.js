import mongoose from "mongoose";

const Matrix = mongoose.model(
  "Matrix",
  new mongoose.Schema({
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    xCoordinate: {
      type: Number,
      required: true,
    },
    yCoordinate: {
      type: Number,
      required: true,
    },
  })
);

export default Matrix;
