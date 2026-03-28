import express from "express";
import Mcq from "../models/Mcq.js";

const router = express.Router();

// // ✅ GET ALL MCQS
// router.get("/", async (req, res) => {
//   try {
//     const mcqs = await Mcq.find();
//     res.json(mcqs);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// // ✅ GET MCQS BY TOPIC
// router.get("/:topicId", async (req, res) => {
//   try {
//     const mcqs = await Mcq.find({ topicId: req.params.topicId });
//     res.json(mcqs);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });


// ✅ GET MCQS WITH PAGINATION + OPTIONAL TOPIC FILTER
router.get("/", async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const topicId = req.query.topicId;

    const skip = (page - 1) * limit;

    // filter object
    let filter = {};

    if (topicId) {
      filter.topicId = topicId;
    }

    // total mcqs count
    const totalMcqs = await Mcq.countDocuments(filter);

    // paginated data
    const mcqs = await Mcq.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalMcqs,
      totalPages: Math.ceil(totalMcqs / limit),
      data: mcqs
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
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

// ✅ UPDATE MCQ BY ID
router.put("/", async (req, res) => {
  try {
    const updatedMcq = await Mcq.findByIdAndUpdate(
      req.body.id,     // ID of MCQ to update
      req.body,          // Data to update
      { returnDocument: "after" }      // Return the updated document
    );

    if (!updatedMcq) {
      return res.status(404).json({ message: "MCQ not found" });
    }

    res.json(updatedMcq);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ DELETE MCQ BY ID
router.delete("/", async (req, res) => {
  try {
    const deletedMcq = await Mcq.findByIdAndDelete(req.body.id);

    if (!deletedMcq) {
      return res.status(404).json({ message: "MCQ not found" });
    }

    res.json({ message: "MCQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


export default router;