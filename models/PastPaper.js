import mongoose from "mongoose";

const PastPaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("PastPaper", PastPaperSchema);