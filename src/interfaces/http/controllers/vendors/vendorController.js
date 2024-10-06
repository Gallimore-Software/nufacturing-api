"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVendorById = exports.updateVendorById = exports.getVendorById = exports.getAllVendors = exports.createVendor = void 0;
const vendorMapper_1 = __importDefault(require("@/application/mapper/vendorMapper"));
const vendorModel_1 = __importDefault(require("@infra/persistence/models/vendorModel")); // Adjust path as needed
// Create a new vendor
const createVendor = async (req, res) => {
    try {
        // Convert request data to domain model using the mapper
        const vendorDomain = vendorMapper_1.default.fromDTO(req.body);
        // Save the domain model instance using VendorModel (Mongoose)
        const savedVendorDoc = await vendorModel_1.default.create(vendorDomain);
        // Convert saved domain model to DTO for response
        const vendorDTO = vendorMapper_1.default.toDTO(savedVendorDoc);
        res.status(201).json(vendorDTO);
    }
    catch (error) {
        res
            .status(400)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.createVendor = createVendor;
// Get all vendors
const getAllVendors = async (req, res) => {
    try {
        // Get all vendors as documents from Mongoose
        const vendors = await vendorModel_1.default.find();
        // Convert domain models to DTOs
        const vendorDTOs = vendors.map((vendor) => vendorMapper_1.default.toDTO(vendor));
        res.status(200).json(vendorDTOs);
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.getAllVendors = getAllVendors;
// Get a single vendor by ID
const getVendorById = async (req, res) => {
    try {
        // Find vendor by ID using VendorModel
        const vendor = await vendorModel_1.default.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        // Convert document to DTO
        const vendorDTO = vendorMapper_1.default.toDTO(vendor);
        res.status(200).json(vendorDTO);
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.getVendorById = getVendorById;
// Update a vendor by ID
const updateVendorById = async (req, res) => {
    try {
        // Convert request data to domain model
        const vendorUpdate = vendorMapper_1.default.fromDTO(req.body);
        // Find and update vendor using VendorModel
        const updatedVendor = await vendorModel_1.default.findByIdAndUpdate(req.params.id, vendorUpdate, {
            new: true,
            runValidators: true,
        });
        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        // Convert updated document to DTO
        const vendorDTO = vendorMapper_1.default.toDTO(updatedVendor);
        res.status(200).json(vendorDTO);
    }
    catch (error) {
        res
            .status(400)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.updateVendorById = updateVendorById;
// Delete a vendor by ID
const deleteVendorById = async (req, res) => {
    try {
        // Find and delete vendor by ID using VendorModel
        const vendor = await vendorModel_1.default.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.status(200).json({ message: "Vendor deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.deleteVendorById = deleteVendorById;
