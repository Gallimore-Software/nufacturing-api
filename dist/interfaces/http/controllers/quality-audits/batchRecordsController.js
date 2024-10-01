"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const batchRecordsModel_1 = __importDefault(
  require("../../models/quality-audits-model/batchRecordsModel"),
);
// Create a new batch record
exports.createBatchRecord = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const batchRecord = new batchRecordsModel_1.default(req.body);
      yield batchRecord.save();
      res.status(201).json(batchRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Get all batch records
exports.getAllBatchRecords = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const batchRecords = yield batchRecordsModel_1.default.find();
      res.status(200).json(batchRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Get a single batch record by ID
exports.getBatchRecordById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const batchRecord = yield batchRecordsModel_1.default.findById(
        req.params._id,
      );
      if (!batchRecord)
        return res.status(404).json({ message: "Batch record not found" });
      res.status(200).json(batchRecord);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Update a batch record by ID
exports.updateBatchRecordById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const batchRecord = yield batchRecordsModel_1.default.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true },
      );
      if (!batchRecord)
        return res.status(404).json({ message: "Batch record not found" });
      res.status(200).json(batchRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// Delete a batch record by ID
exports.deleteBatchRecordById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const batchRecord = yield batchRecordsModel_1.default.findByIdAndDelete(
        req.params._id,
      );
      if (!batchRecord)
        return res.status(404).json({ message: "Batch record not found" });
      res.status(200).json({ message: "Batch record deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//# sourceMappingURL=batchRecordsController.js.map
