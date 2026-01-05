import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  experience: String,
  qualification: String,
  skills: [String],
});

// IMPORTANT: prevent model overwrite error
export default mongoose.models.excerptjobdatas ||
  mongoose.model("excerptjobdatas", JobSchema);
