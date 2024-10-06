"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuote = exports.updateQuote = exports.createQuote = exports.getQuoteById = exports.getAllQuotes = void 0;
const quoteModel_1 = __importDefault(require("@infra/persistence/models/quoteModel"));
// Utility function for standardized response handling
const sendResponse = ({ res, statusCode, success, message, data, error, }) => {
    res.status(statusCode).json({
        success,
        message,
        ...(data !== undefined && { data }),
        ...(error && { error }),
    });
};
// Get all quotes
const getAllQuotes = async (req, res) => {
    try {
        const quotes = await quoteModel_1.default.find().populate("accountManager productType formula ingredients");
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Quotes fetched successfully",
            data: quotes,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching quotes",
            error: err.message,
        });
    }
};
exports.getAllQuotes = getAllQuotes;
// Get quote by ID
const getQuoteById = async (req, res) => {
    try {
        const quote = await quoteModel_1.default.findById(req.params.quoteId).populate("accountManager productType formula ingredients");
        if (!quote) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Quote not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Quote fetched successfully",
            data: quote,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching quote",
            error: err.message,
        });
    }
};
exports.getQuoteById = getQuoteById;
// Create a new quote
const createQuote = async (req, res) => {
    try {
        const newQuote = new quoteModel_1.default(req.body);
        await newQuote.save();
        sendResponse({
            res,
            statusCode: 201,
            success: true,
            message: "Quote created successfully",
            data: newQuote,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error creating quote",
            error: err.message,
        });
    }
};
exports.createQuote = createQuote;
// Update quote
const updateQuote = async (req, res) => {
    try {
        const updatedQuote = await quoteModel_1.default.findByIdAndUpdate(req.params.quoteId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedQuote) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Quote not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Quote updated successfully",
            data: updatedQuote,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error updating quote",
            error: err.message,
        });
    }
};
exports.updateQuote = updateQuote;
// Delete quote
const deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await quoteModel_1.default.findByIdAndDelete(req.params.quoteId);
        if (!deletedQuote) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Quote not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Quote deleted successfully",
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error deleting quote",
            error: err.message,
        });
    }
};
exports.deleteQuote = deleteQuote;
