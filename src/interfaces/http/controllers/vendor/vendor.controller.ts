import { VendorModel } from '@interfaces/dtos/vendor/vendor.dto';
import { Request, Response } from 'express';

// Create a new vendor
export const createVendor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const savedVendorDoc = await VendorModel.create(req.body);
    res.status(201).json(savedVendorDoc);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Get all vendors
export const getAllVendors = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get all vendors as documents from Mongoose
    const vendors = await VendorModel.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Get a single vendor by ID
export const getVendorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Find vendor by ID using VendorModel
    const vendor = await VendorModel.findById(req.params.id);
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Update a vendor by ID
export const updateVendorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Find and update vendor using VendorModel
    const updatedVendor = await VendorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVendor) {
      res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Delete a vendor by ID
export const deleteVendorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Find and delete vendor by ID using VendorModel
    const vendor = await VendorModel.findByIdAndDelete(req.params.id);
    if (!vendor) {
      res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
