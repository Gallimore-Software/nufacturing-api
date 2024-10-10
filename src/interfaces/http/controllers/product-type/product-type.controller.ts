import { Request, Response } from 'express';
import ProductType from '@infrastructure/persistence/models/product-type/product-type-model';

// Define the custom request parameter type for ProductType
interface ProductTypeRequestParams {
  typeId: string;
}

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

// Get all product types
export const getAllProductTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productTypes = await ProductType.find();
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product types fetched successfully',
      data: productTypes,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching product types',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get product type by ID
export const getProductTypeById = async (
  req: Request<ProductTypeRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const productType = await ProductType.findById(req.params.typeId);
    if (!productType) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product type not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product type fetched successfully',
      data: productType,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching product type',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create a new product type
export const createProductType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProductType = new ProductType(req.body);
    await newProductType.save();
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: 'Product type created successfully',
      data: newProductType,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error creating product type',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update product type by ID
export const updateProductType = async (
  req: Request<ProductTypeRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const updatedProductType = await ProductType.findByIdAndUpdate(
      req.params.typeId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProductType) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product type not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product type updated successfully',
      data: updatedProductType,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error updating product type',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete product type by ID
export const deleteProductType = async (
  req: Request<ProductTypeRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const deletedProductType = await ProductType.findByIdAndDelete(
      req.params.typeId
    );
    if (!deletedProductType) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product type not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product type deleted successfully',
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error deleting product type',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
