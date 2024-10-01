const LabTest = require("../../models/research-and-development-model/labTestingModel");

// Get all lab tests
exports.getAllLabTests = async (req, res) => {
  try {
    const labTests = await LabTest.find().populate("relatedInventoryItem");
    res.status(200).json(labTests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab tests", error });
  }
};

// Get a lab test by ID
exports.getLabTestById = async (req, res) => {
  try {
    const labTest = await LabTest.findById(req.params.id).populate(
      "relatedInventoryItem",
    );
    if (!labTest) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(200).json(labTest);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lab test", error });
  }
};

// Create a new lab test
exports.createLabTest = async (req, res) => {
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
    res.status(201).json(newLabTest);
  } catch (error) {
    res.status(400).json({ message: "Error creating lab test", error });
  }
};

// Update a lab test
exports.updateLabTest = async (req, res) => {
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
      return res.status(404).json({ message: "Lab test not found" });
    }

    res.status(200).json(updatedLabTest);
  } catch (error) {
    res.status(400).json({ message: "Error updating lab test", error });
  }
};

// Delete a lab test
exports.deleteLabTest = async (req, res) => {
  try {
    const deletedLabTest = await LabTest.findByIdAndDelete(req.params.id);
    if (!deletedLabTest) {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(200).json({ message: "Lab test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lab test", error });
  }
};
