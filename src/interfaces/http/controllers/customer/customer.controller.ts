import { Request, Response, RequestHandler } from 'express';
import Customer from '@infrastructure/persistence/models/customer/customer-model';
import { ParamsDictionary } from 'express-serve-static-core';

// Define types for request parameters and request body
interface CustomerRequestBody {
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  comments?: string;
}

// Extend ParamsDictionary to include the customerId
interface CustomerRequestParams extends ParamsDictionary {
  customerId: string;
}

// Create a new customer
export const createCustomer: RequestHandler = async (
  req: Request<object, object, CustomerRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, phone, address, isActive, comments } = req.body;

    // Create the customer entry
    const customer = new Customer({
      name,
      email,
      phone,
      address,
      isActive,
      comments,
    });

    await customer.save();
    return res.status(201).json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating customer',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all customers
export const getAllCustomers: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ success: true, data: customers });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching customers',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single customer by ID
export const getCustomerById: RequestHandler<CustomerRequestParams> = async (
  req: Request<CustomerRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching customer',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a customer by ID
export const updateCustomer: RequestHandler<
  CustomerRequestParams,
  object,
  CustomerRequestBody
> = async (
  req: Request<CustomerRequestParams, object, CustomerRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { customerId } = req.params;
    const updatedData = req.body;

    const customer = await Customer.findByIdAndUpdate(customerId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating customer',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a customer by ID
export const deleteCustomer: RequestHandler<CustomerRequestParams> = async (
  req: Request<CustomerRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: 'Customer not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting customer',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
