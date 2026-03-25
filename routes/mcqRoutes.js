import express from "express";
import Mcq from "../models/Mcq.js";

const router = express.Router();

// ✅ GET ALL MCQS
router.get("/", async (req, res) => {
  try {
    const mcqs = await Mcq.find();
    res.json(mcqs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ GET MCQS BY TOPIC
router.get("/:topicId", async (req, res) => {
  try {
    const mcqs = await Mcq.find({ topicId: req.params.topicId });
    res.json(mcqs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ ADD MCQ
router.post("/", async (req, res) => {
  try {
    const mcq = new Mcq(req.body);
    await mcq.save();
    res.json(mcq);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;