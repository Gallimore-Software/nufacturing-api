import { VendorEntity } from "@/application/dto/vendorDTO";
import { VendorMapper } from "@/application/mapper/vendorMapper";

// Create a new vendor
export const createVendor = async (req, res) => {
  try {
    // Convert request data to domain model using the mapper
    const vendorDomain = VendorMapper.fromDTO(req.body);

    // Save the domain model instance
    const savedVendor = await vendorDomain.save();

    // Convert saved domain model to DTO for response
    const vendorDTO = VendorMapper.toDTO(savedVendor);

    res.status(201).json(vendorDTO);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    // Get all vendors as domain models
    const vendors = await VendorEntity.find();

    // Convert domain models to DTOs
    const vendorDTOs = vendors.map((vendor) => VendorMapper.toDTO(vendor));

    res.status(200).json(vendorDTOs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Get a single vendor by ID
export const getVendorById = async (req, res) => {
  try {
    // Find vendor by ID as domain model
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Convert domain model to DTO
    const vendorDTO = VendorMapper.toDTO(vendor);

    res.status(200).json(vendorDTO);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update a vendor by ID
export const updateVendorById = async (req, res) => {
  try {
    // Convert request data to domain model
    const vendorUpdate = VendorMapper.fromDTO(req.body);

    // Find and update vendor
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      vendorUpdate,
      {
        new: true,
      },
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Convert updated domain model to DTO
    const vendorDTO = VendorMapper.toDTO(updatedVendor);

    res.status(200).json(vendorDTO);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

// Delete a vendor by ID
export const deleteVendorById = async (req, res) => {
  try {
    // Find and delete vendor by ID
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
