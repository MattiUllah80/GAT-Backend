import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();


// ✅ GET ALL TOPICS
router.get("/", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});


// ✅ GET TOPICS BY SUBJECT
router.get("/:subjectId", async (req, res) => {
  const topics = await Topic.find({
    subjectId: req.params.subjectId,
  });

  res.json(topics);
});


// ✅ ADD TOPIC
router.post("/", async (req, res) => {
  const topic = new Topic(req.body);
  await topic.save();
  res.json(topic);
});

export default router;