import express from "express";
const router = express.Router();
import Subject from "../models/Subject.js";
// GET all subjects
router.get("/", async (req, res) => {
  const data = await Subject.find();
  res.json(data);
});

// ADD subject
router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.json(subject);
});

export default router;