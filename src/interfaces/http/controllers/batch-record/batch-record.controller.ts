import { RequestHandler } from 'express';
import BatchRecords from '@infrastructure/persistence/models/batch-record/batch-record-model';

// Create a new batch record
export const createBatchRecord: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const batchRecord = new BatchRecords(req.body);
    await batchRecord.save();
    res.status(201).json({ success: true, data: batchRecord });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating batch record',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all batch records
export const getAllBatchRecords: RequestHandler = async (
  _req,
  res
): Promise<void> => {
  try {
    const batchRecords = await BatchRecords.find();
    res.status(200).json({ success: true, data: batchRecords });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch records',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single batch record by ID
export const getBatchRecordById: RequestHandler<{ _id: string }> = async (
  req,
  res
): Promise<void> => {
  try {
    const batchRecord = await BatchRecords.findById(req.params._id);
    if (!batchRecord) {
      res
        .status(404)
        .json({ success: false, message: 'Batch record not found' });
      return;
    }
    res.status(200).json({ success: true, data: batchRecord });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching batch record',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a batch record by ID
export const updateBatchRecordById: RequestHandler<{ _id: string }> = async (
  req,
  res
): Promise<void> => {
  try {
    const batchRecord = await BatchRecords.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!batchRecord) {
      res
        .status(404)
        .json({ success: false, message: 'Batch record not found' });
      return;
    }
    res.status(200).json({ success: true, data: batchRecord });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating batch record',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a batch record by ID
export const deleteBatchRecordById: RequestHandler<{ _id: string }> = async (
  req,
  res
): Promise<void> => {
  try {
    const batchRecord = await BatchRecords.findByIdAndDelete(req.params._id);
    if (!batchRecord) {
      res
        .status(404)
        .json({ success: false, message: 'Batch record not found' });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: 'Batch record deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting batch record',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
