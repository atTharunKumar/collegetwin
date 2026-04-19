import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  id: String,
  name: String,
  faculty: String,
  slot: String,
  room: String,
  students: Number,
  clashRisk: Number,
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);