import Order from '@infrastructure/persistence/models/order/order-model';
import { Request, Response } from 'express';

// Utility function for standardized response handling
const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
  error,
}: {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}): void => {
  res.status(statusCode).json({
    success,
    message,
    ...(data !== undefined && { data }),
    ...(error && { error }),
  });
};

// Get all orders
export const getAllOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find().populate('customer products.productId');
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching orders',
      error: (err as Error).message,
    });
  }
};

// Get order by ID
export const getOrderById = async (
  req: Request<{ orderId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate(
      'customer products.productId'
    );

    if (!order) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Order not found',
      });
      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Order fetched successfully',
      data: order,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching order',
      error: (err as Error).message,
    });
  }
};

// Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();

    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error creating order',
      error: (err as Error).message,
    });
  }
};

// Update order
export const updateOrder = async (
  req: Request<{ orderId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Order not found',
      });
      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error updating order',
      error: (err as Error).message,
    });
  }
};

// Delete order
export const deleteOrder = async (
  req: Request<{ orderId: string }>,
  res: Response
): Promise<void> => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Order not found',
      });
      return;
    }

    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error deleting order',
      error: (err as Error).message,
    });
  }
};
