import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import subjectRoutes from "./routes/subjectRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/mcqs", mcqRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});