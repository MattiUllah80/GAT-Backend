import express from "express";
import Mcq from "../models/Mcq.js";

const router = express.Router();


// ✅ GET ALL MCQS
router.get("/", async (req, res) => {
  const mcqs = await Mcq.find();
  res.json(mcqs);
});


// ✅ GET MCQS BY TOPIC
router.get("/:topicId", async (req, res) => {
  const mcqs = await Mcq.find({
    topicId: req.params.topicId,
  });

  res.json(mcqs);
});


// ✅ ADD MCQ
router.post("/", async (req, res) => {
  const mcq = new Mcq(req.body);
  await mcq.save();
  res.json(mcq);
});

export default router;