import Customer from "@infra/persistence/models/customerModel";
import { Request, Response } from "express";

// Utility types for request parameters and response data
interface CustomerRequestParams {
  customerId: string;
}

interface SendResponseParams<T> {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Utility function for standardized response handling
const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
  error,
}: SendResponseParams<T>): void => {
  res.status(statusCode).json({
    success,
    message,
    ...(data !== undefined && { data }),
    ...(error && { error }),
  });
};

// Get all customers
export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customers = await Customer.find();
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error fetching customers",
      error: (err as Error).message,
    });
  }
};

// Get customer by ID
export const getCustomerById = async (
  req: Request<CustomerRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const customer = await Customer.findById(req.params.customerId);
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
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error fetching customer",
      error: (err as Error).message,
    });
  }
};

// Create a new customer
export const createCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: "Error creating customer",
      error: (err as Error).message,
    });
  }
};

// Update customer
export const updateCustomer = async (
  req: Request<CustomerRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.customerId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: "Error updating customer",
      error: (err as Error).message,
    });
  }
};

// Delete customer
export const deleteCustomer = async (
  req: Request<CustomerRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.customerId
    );
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
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error deleting customer",
      error: (err as Error).message,
    });
  }
};
