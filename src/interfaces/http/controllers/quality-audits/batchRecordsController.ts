const BatchRecords = require("../../models/quality-audits-model/batchRecordsModel");

// Create a new batch record
exports.createBatchRecord = async (req, res) => {
  try {
    const batchRecord = new BatchRecords(req.body);
    await batchRecord.save();
    res.status(201).json(batchRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all batch records
exports.getAllBatchRecords = async (req, res) => {
  try {
    const batchRecords = await BatchRecords.find();
    res.status(200).json(batchRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single batch record by ID
exports.getBatchRecordById = async (req, res) => {
  try {
    const batchRecord = await BatchRecords.findById(req.params._id);
    if (!batchRecord)
      return res.status(404).json({ message: "Batch record not found" });
    res.status(200).json(batchRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a batch record by ID
exports.updateBatchRecordById = async (req, res) => {
  try {
    const batchRecord = await BatchRecords.findByIdAndUpdate(
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
};

// Delete a batch record by ID
exports.deleteBatchRecordById = async (req, res) => {
  try {
    const batchRecord = await BatchRecords.findByIdAndDelete(req.params._id);
    if (!batchRecord)
      return res.status(404).json({ message: "Batch record not found" });
    res.status(200).json({ message: "Batch record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
