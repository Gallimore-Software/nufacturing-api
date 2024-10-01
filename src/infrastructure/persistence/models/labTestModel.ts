import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true,
  },
  testDate: {
    type: Date,
    required: true,
  },
  result: {
    type: String,
    enum: ["Pass", "Fail", "Pending"],
    default: "Pending",
  },
  comments: {
    type: String,
  },
  testedBy: {
    type: String,
    required: true,
  },
  relatedInventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  attachments: [
    {
      url: String,
      fileName: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const LabTest = mongoose.model("LabTest", labTestSchema);

module.exports = LabTest;
