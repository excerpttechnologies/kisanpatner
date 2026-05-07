const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  b2bUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "B2BUser",
    required: true,
  },
  businessName: { type: String, default: "" },
  messages: [
    {
      sender: { type: String, enum: ["user", "bot"], required: true },
      text: { type: String, required: true },
      intent: { type: String, default: "" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  sessionActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
