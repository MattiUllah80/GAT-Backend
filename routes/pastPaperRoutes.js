import express from "express";
import PastPaper from "../models/PastPaper.js";

const router = express.Router();


// ✅ GET ALL PAPERS
router.get("/", async (req, res) => {
  try {
    const papers = await PastPaper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// ✅ GET SINGLE PAPER
router.get("/:id", async (req, res) => {
  try {
    const paper = await PastPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(paper);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// ✅ CREATE PAPER
router.post("/", async (req, res) => {
  try {
    const paper = new PastPaper(req.body);
    await paper.save();

    res.json(paper);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// ✅ UPDATE PAPER
router.put("/:id", async (req, res) => {
  try {
    const updatedPaper = await PastPaper.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json(updatedPaper);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});


// ✅ DELETE PAPER
router.delete("/:id", async (req, res) => {
  try {
    const deletedPaper = await PastPaper.findByIdAndDelete(
      req.params.id
    );

    if (!deletedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.json({ message: "Paper deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

export default router;