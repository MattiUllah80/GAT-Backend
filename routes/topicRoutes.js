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

export default router;