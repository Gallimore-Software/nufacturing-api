import VendorModel, {
  IVendor,
} from '@infrastructure/persistence/models/vendorModel'; // Adjust path as needed
import { Request, Response } from 'express';

import VendorMapper from '@/application/mapper/vendorMapper';

// Create a new vendor
export const createVendor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Convert request data to domain model using the mapper
    const vendorDomain: IVendor = VendorMapper.fromDTO(req.body);

    // Save the domain model instance using VendorModel (Mongoose)
    const savedVendorDoc = await VendorModel.create(vendorDomain);

    // Convert saved domain model to DTO for response
    const vendorDTO = VendorMapper.toDTO(savedVendorDoc);

    res.status(201).json(vendorDTO);
  } catch (error) {
    res.status(400).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

// Get all vendors
export const getAllVendors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Get all vendors as documents from Mongoose
    const vendors = await VendorModel.find();

    // Convert domain models to DTOs
    const vendorDTOs = vendors.map((vendor) => VendorMapper.toDTO(vendor));

    res.status(200).json(vendorDTOs);
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
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Convert document to DTO
    const vendorDTO = VendorMapper.toDTO(vendor);

    res.status(200).json(vendorDTO);
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
    // Convert request data to domain model
    const vendorUpdate: Partial<IVendor> = VendorMapper.fromDTO(req.body);

    // Find and update vendor using VendorModel
    const updatedVendor = await VendorModel.findByIdAndUpdate(
      req.params.id,
      vendorUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Convert updated document to DTO
    const vendorDTO = VendorMapper.toDTO(updatedVendor);

    res.status(200).json(vendorDTO);
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
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};
