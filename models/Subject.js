import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: String,
  icon: String
});

export default mongoose.model("Subject", SubjectSchema);