import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

// ✅ GET ALL TOPICS
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ GET TOPICS BY SUBJECT
router.get("/:subjectId", async (req, res) => {
  try {
    const topics = await Topic.find({ subjectId: req.params.subjectId });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ ADD TOPIC
router.post("/", async (req, res) => {
  try {
    const topic = new Topic(req.body);
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ UPDATE TOPIC
router.put("/", async (req, res) => {
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.body.id,      // topic id URL se
      req.body,           // body mai jo data aya update ke liye
      { returnDocument: "after"}       // ye option updated doc return kare
    );

    if (!updatedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ DELETE TOPIC
router.delete("/", async (req, res) => {
  try {
    const deletedTopic = await Topic.findByIdAndDelete(req.body.id);

    if (!deletedTopic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json({ message: "Topic deleted successfully", topic: deletedTopic });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;