import LabTest from '@infrastructure/persistence/models/lab-test/lab-test-model';
import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core'; // Import this for default parameter handling

// Define types for request parameters and request body
interface LabTestRequestParams extends ParamsDictionary {
  labTestId: string; // Add the labTestId parameter to the default ParamsDictionary
}

interface LabTestRequestBody {
  testName: string;
  testDate: Date;
  result: string;
  comments?: string;
  testedBy: string;
  relatedInventoryItem: string;
  attachments?: string[];
}

// Get all lab tests
export const getAllLabTests: RequestHandler = async (
  _req,
  res
): Promise<void> => {
  try {
    const labTests = await LabTest.find().populate('relatedInventoryItem');
    res.status(200).json({ success: true, data: labTests });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab tests',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a lab test by ID
export const getLabTestById: RequestHandler<LabTestRequestParams> = async (
  req,
  res
): Promise<void> => {
  try {
    const labTest = await LabTest.findById(req.params.labTestId).populate(
      'relatedInventoryItem'
    );
    if (!labTest) {
      res.status(404).json({ success: false, message: 'Lab test not found' });
      return;
    }
    res.status(200).json({ success: true, data: labTest });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lab test',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create a new lab test
export const createLabTest: RequestHandler<
  object,
  object,
  LabTestRequestBody
> = async (req, res): Promise<void> => {
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

    await newLabTest.save();
    res.status(201).json({ success: true, data: newLabTest });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating lab test',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a lab test
export const updateLabTest: RequestHandler<
  LabTestRequestParams,
  object,
  LabTestRequestBody
> = async (req, res): Promise<void> => {
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

    const updatedLabTest = await LabTest.findByIdAndUpdate(
      req.params.labTestId, // Make sure the parameter is correctly typed
      {
        testName,
        testDate,
        result,
        comments,
        testedBy,
        relatedInventoryItem,
        attachments,
      },
      { new: true, runValidators: true }
    ).populate('relatedInventoryItem');

    if (!updatedLabTest) {
      res.status(404).json({ success: false, message: 'Lab test not found' });
      return;
    }

    res.status(200).json({ success: true, data: updatedLabTest });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating lab test',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a lab test
export const deleteLabTest: RequestHandler<LabTestRequestParams> = async (
  req,
  res
): Promise<void> => {
  try {
    const deletedLabTest = await LabTest.findByIdAndDelete(
      req.params.labTestId
    );
    if (!deletedLabTest) {
      res.status(404).json({ success: false, message: 'Lab test not found' });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: 'Lab test deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting lab test',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
