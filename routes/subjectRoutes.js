import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

// GET ALL SUBJECTS
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ADD SUBJECT
router.post("/", async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// UPDATE SUBJECT
router.put("/:id", async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {returnDocument: "after"}
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(updatedSubject);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// DELETE SUBJECT
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;