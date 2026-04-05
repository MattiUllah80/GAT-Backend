import express from "express";
import Syllabus from "../models/Syllabus.js";
import upload from "../middleware/uploadSyllabus.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


const router = express.Router();


// =============================
// Helper Function (Upload PDF)
// =============================
const uploadPDF = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // IMPORTANT for PDF
        folder: "syllabus",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};



// =============================
// ✅ GET ALL SYLLABUS
// =============================
router.get("/", async (req, res) => {
  try {
    const syllabus = await Syllabus.find().sort({ createdAt: -1 });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// =============================
// ✅ ADD SYLLABUS (PDF Upload)
// =============================
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF required" });
    }

    // Upload to Cloudinary
    const result = await uploadPDF(req.file.buffer);

    const syllabus = new Syllabus({
      title: req.body.title,
      description: req.body.description,
      pdfUrl: result.secure_url, // cloud URL
    });

    await syllabus.save();

    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// =============================
// ✅ UPDATE SYLLABUS
// =============================
router.put("/:id", upload.single("pdf"), async (req, res) => {
  try {
    let updateData = {
      title: req.body.title,
      description: req.body.description,
    };

    // If new PDF uploaded
    if (req.file) {
      const result = await uploadPDF(req.file.buffer);
      updateData.pdfUrl = result.secure_url;
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



// =============================
// ✅ DELETE SYLLABUS
// =============================
router.delete("/:id", async (req, res) => {
  try {
    await Syllabus.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;