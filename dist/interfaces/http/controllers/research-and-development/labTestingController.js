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
const LabTest = require("../../models/research-and-development-model/labTestingModel");
// Get all lab tests
exports.getAllLabTests = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labTests = yield LabTest.find().populate("relatedInventoryItem");
      res.status(200).json(labTests);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lab tests", error });
    }
  });
// Get a lab test by ID
exports.getLabTestById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const labTest = yield LabTest.findById(req.params.id).populate(
        "relatedInventoryItem",
      );
      if (!labTest) {
        return res.status(404).json({ message: "Lab test not found" });
      }
      res.status(200).json(labTest);
    } catch (error) {
      res.status(500).json({ message: "Error fetching lab test", error });
    }
  });
// Create a new lab test
exports.createLabTest = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const {
        testName,
        testDate,
        result,
        comments,
        testedBy,
        relatedInventoryItem,
        attachments,
      } = req.body;
      const newLabTest = new LabTest({
        testName,
        testDate,
        result,
        comments,
        testedBy,
        relatedInventoryItem,
        attachments,
      });
      yield newLabTest.save();
      res.status(201).json(newLabTest);
    } catch (error) {
      res.status(400).json({ message: "Error creating lab test", error });
    }
  });
// Update a lab test
exports.updateLabTest = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const {
        testName,
        testDate,
        result,
        comments,
        testedBy,
        relatedInventoryItem,
        attachments,
      } = req.body;
      const updatedLabTest = yield LabTest.findByIdAndUpdate(
        req.params.id,
        {
          testName,
          testDate,
          result,
          comments,
          testedBy,
          relatedInventoryItem,
          attachments,
        },
        { new: true, runValidators: true },
      ).populate("relatedInventoryItem");
      if (!updatedLabTest) {
        return res.status(404).json({ message: "Lab test not found" });
      }
      res.status(200).json(updatedLabTest);
    } catch (error) {
      res.status(400).json({ message: "Error updating lab test", error });
    }
  });
// Delete a lab test
exports.deleteLabTest = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedLabTest = yield LabTest.findByIdAndDelete(req.params.id);
      if (!deletedLabTest) {
        return res.status(404).json({ message: "Lab test not found" });
      }
      res.status(200).json({ message: "Lab test deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting lab test", error });
    }
  });
//# sourceMappingURL=labTestingController.js.map
