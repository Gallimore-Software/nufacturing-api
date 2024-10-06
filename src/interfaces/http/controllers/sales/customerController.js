"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getAllCustomers = void 0;
const customerModel_1 = __importDefault(require("@infrastructure/persistence/models/customerModel"));
// Utility function for standardized response handling
const sendResponse = ({ res, statusCode, success, message, data, error, }) => {
    res.status(statusCode).json({
        success,
        message,
        ...(data !== undefined && { data }),
        ...(error && { error }),
    });
};
// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel_1.default.find();
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Customers fetched successfully",
            data: customers,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching customers",
            error: err.message,
        });
    }
};
exports.getAllCustomers = getAllCustomers;
// Get customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await customerModel_1.default.findById(req.params.customerId);
        if (!customer) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Customer not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Customer fetched successfully",
            data: customer,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching customer",
            error: err.message,
        });
    }
};
exports.getCustomerById = getCustomerById;
// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const newCustomer = new customerModel_1.default(req.body);
        await newCustomer.save();
        sendResponse({
            res,
            statusCode: 201,
            success: true,
            message: "Customer created successfully",
            data: newCustomer,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error creating customer",
            error: err.message,
        });
    }
};
exports.createCustomer = createCustomer;
// Update customer
const updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await customerModel_1.default.findByIdAndUpdate(req.params.customerId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCustomer) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Customer not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error updating customer",
            error: err.message,
        });
    }
};
exports.updateCustomer = updateCustomer;
// Delete customer
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await customerModel_1.default.findByIdAndDelete(req.params.customerId);
        if (!deletedCustomer) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Customer not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Customer deleted successfully",
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error deleting customer",
            error: err.message,
        });
    }
};
exports.deleteCustomer = deleteCustomer;
