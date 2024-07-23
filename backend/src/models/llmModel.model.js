import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  type: { type: String, default: "" },
  name: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  url: { type: String, default: "" },
  datasheet: { type: String, default: "" },
  modality: { type: String, required: true },
  size: { type: String, default: "" },
  sample: { type: String, default: "" },
  analysis: {
    type: String,
    default: "",
  },
  dependencies: { type: [String], default: [] },
  included: { type: String, default: "" },
  excluded: { type: String, default: "" },
  quality_control: { type: String, default: "" },
  access: { type: String, default: "" },
  license: { type: String, default: "" },
  intended_uses: { type: String, default: "" },
  prohibited_uses: { type: String, default: "" },
  monitoring: { type: String, default: "" },
  feedback: {
    type: String,
    default: "",
  },
  model_card: {
    type: String,
    default: "",
  },
  training_emissions: { type: String, default: "" },
  training_time: { type: String, default: "" },
  training_hardware: {
    type: String,
    default: "",
  },
  adaptation: { type: String, default: "" },
  output_space: { type: String, default: "" },
  terms_of_service: { type: String, default: "" },
  monthly_active_users: { type: String, default: "" },
  user_distribution: { type: String, default: "" },
  failures: { type: String, default: "" },
});

const Model = mongoose.model("llm-model", ModelSchema);

export default Model;
