"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getAllOrders = void 0;
const orderModel_1 = __importDefault(require("@infra/persistence/models/orderModel"));
// Utility function for standardized response handling
const sendResponse = ({ res, statusCode, success, message, data, error, }) => {
    res.status(statusCode).json({
        success,
        message,
        ...(data !== undefined && { data }),
        ...(error && { error }),
    });
};
// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel_1.default.find().populate("customer products.productId");
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching orders",
            error: err.message,
        });
    }
};
exports.getAllOrders = getAllOrders;
// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await orderModel_1.default.findById(req.params.orderId).populate("customer products.productId");
        if (!order) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Order not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error fetching order",
            error: err.message,
        });
    }
};
exports.getOrderById = getOrderById;
// Create a new order
const createOrder = async (req, res) => {
    try {
        const newOrder = new orderModel_1.default(req.body);
        await newOrder.save();
        sendResponse({
            res,
            statusCode: 201,
            success: true,
            message: "Order created successfully",
            data: newOrder,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error creating order",
            error: err.message,
        });
    }
};
exports.createOrder = createOrder;
// Update order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel_1.default.findByIdAndUpdate(req.params.orderId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedOrder) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Order not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 400,
            success: false,
            message: "Error updating order",
            error: err.message,
        });
    }
};
exports.updateOrder = updateOrder;
// Delete order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderModel_1.default.findByIdAndDelete(req.params.orderId);
        if (!deletedOrder) {
            sendResponse({
                res,
                statusCode: 404,
                success: false,
                message: "Order not found",
            });
            return;
        }
        sendResponse({
            res,
            statusCode: 200,
            success: true,
            message: "Order deleted successfully",
        });
    }
    catch (err) {
        sendResponse({
            res,
            statusCode: 500,
            success: false,
            message: "Error deleting order",
            error: err.message,
        });
    }
};
exports.deleteOrder = deleteOrder;
