import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    experience: String,
    qualification: String,
    skills: [String],
  },
  { 
    collection: "excerptjobdatas", // Exact collection name from your Node.js app
    timestamps: false // Add this if you don't have createdAt/updatedAt fields
  }
);

// Use the exact model name from your Node.js app
const Job = mongoose.models.excerptjobdatas || 
  mongoose.model("excerptjobdatas", JobSchema);

export default Job;