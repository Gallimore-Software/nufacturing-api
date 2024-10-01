import BatchRecords from "@models/batchRecordModel";

// Create a new batch record
export const createBatchRecord = async (req, res) => {
  try {
    const batchRecord = new BatchRecords(req.body);
    await batchRecord.save();
    res.status(201).json(batchRecord);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Get all batch records
export const getAllBatchRecords = async (req, res) => {
  try {
    const batchRecords = await BatchRecords.find();
    res.status(200).json(batchRecords);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get a single batch record by ID
export const getBatchRecordById = async (req, res) => {
  try {
    const batchRecord = await BatchRecords.findById(req.params._id);
    if (!batchRecord)
      return res.status(404).json({ message: "Batch record not found" });
    res.status(200).json(batchRecord);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update a batch record by ID
export const updateBatchRecordById = async (req, res) => {
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
    res.status(400).json({ message: error });
  }
};

// Delete a batch record by ID
export const deleteBatchRecordById = async (req, res) => {
  try {
    const batchRecord = await BatchRecords.findByIdAndDelete(req.params._id);
    if (!batchRecord)
      return res.status(404).json({ message: "Batch record not found" });
    res.status(200).json({ message: "Batch record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
