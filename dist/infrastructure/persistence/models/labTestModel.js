"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const labTestSchema = new mongoose_1.default.Schema({
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
    type: mongoose_1.default.Schema.Types.ObjectId,
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
const LabTest = mongoose_1.default.model("LabTest", labTestSchema);
module.exports = LabTest;
//# sourceMappingURL=labTestModel.js.map
