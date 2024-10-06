import LabTest from "@infrastructure/persistence/models/labTestModel";
import { Request, Response } from "express";

// Define types for request parameters and request body
interface LabTestRequestParams {
  id: string;
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
export const getAllLabTests = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const labTests = await LabTest.find().populate("relatedInventoryItem");
    res.status(200).json({ success: true, data: labTests });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lab tests",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a lab test by ID
export const getLabTestById = async (
  req: Request<LabTestRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const labTest = await LabTest.findById(req.params.id).populate(
      "relatedInventoryItem",
    );
    if (!labTest) {
      res.status(404).json({ success: false, message: "Lab test not found" });
      return;
    }
    res.status(200).json({ success: true, data: labTest });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lab test",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create a new lab test
export const createLabTest = async (
  req: Request<object, object, LabTestRequestBody>,
  res: Response,
): Promise<void> => {
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
      message: "Error creating lab test",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a lab test
export const updateLabTest = async (
  req: Request<LabTestRequestParams, object, LabTestRequestBody>,
  res: Response,
): Promise<void> => {
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
      res.status(404).json({ success: false, message: "Lab test not found" });
      return;
    }

    res.status(200).json({ success: true, data: updatedLabTest });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating lab test",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a lab test
export const deleteLabTest = async (
  req: Request<LabTestRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const deletedLabTest = await LabTest.findByIdAndDelete(req.params.id);
    if (!deletedLabTest) {
      res.status(404).json({ success: false, message: "Lab test not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Lab test deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting lab test",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
