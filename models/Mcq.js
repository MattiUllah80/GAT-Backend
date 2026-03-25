import mongoose from "mongoose";

const McqSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },
  question: String,
  options: [String],
  correctAnswer: Number
});

export default mongoose.model("Mcq", McqSchema);