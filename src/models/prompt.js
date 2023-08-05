const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PromptSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required."],
  },
  content: {
    type: String,
  },
});

const PromptModel = mongoose.model("Prompt", PromptSchema);

  module.exports = PromptModel;