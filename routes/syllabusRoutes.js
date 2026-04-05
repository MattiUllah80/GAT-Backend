import express from "express";
import Syllabus from "../models/Syllabus.js";
import upload from "../middleware/uploadSyllabus.js";

const router = express.Router();


// ✅ GET ALL SYLLABUS
router.get("/", async (req, res) => {
  try {
    const syllabus = await Syllabus.find().sort({ createdAt: -1 });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ ADD SYLLABUS (PDF Upload)
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const syllabus = new Syllabus({
      title: req.body.title,
      description: req.body.description,
      pdfUrl: `/uploads/syllabus/${req.file.filename}`,
    });

    await syllabus.save();

    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ UPDATE SYLLABUS
router.put("/:id", upload.single("pdf"), async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      updateData.pdfUrl = `/uploads/syllabus/${req.file.filename}`;
    }

    const updated = await Syllabus.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE SYLLABUS
router.delete("/:id", async (req, res) => {
  try {
    await Syllabus.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;