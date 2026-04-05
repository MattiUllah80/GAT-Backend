import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import subjectRoutes from "./routes/subjectRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import pastPaperRoutes from "./routes/pastPaperRoutes.js";
import syllabusRoutes from "./routes/syllabusRoutes.js";



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/pastpapers", pastPaperRoutes);
app.use("/api/syllabus", syllabusRoutes);

// ✅ Health check route
app.get("/", (req, res) => res.send("GAT API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 