import mongoose from "mongoose";   

const TopicSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  name: String
});

export default mongoose.model("Topic", TopicSchema);