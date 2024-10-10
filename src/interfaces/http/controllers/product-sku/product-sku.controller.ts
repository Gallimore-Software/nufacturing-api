import { Request, Response } from 'express';
import ProductSKU from '@infrastructure/persistence/models/product-sku/product-sku-model';

// Define the custom request parameter type for ProductSKU
interface ProductSKURequestParams {
  skuId: string;
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

// Get all product SKUs
export const getAllProductSKUs = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const productSKUs = await ProductSKU.find();
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product SKUs fetched successfully',
      data: productSKUs,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching product SKUs',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get product SKU by ID
export const getProductSKUById = async (
  req: Request<ProductSKURequestParams>,
  res: Response
): Promise<void> => {
  try {
    const productSKU = await ProductSKU.findById(req.params.skuId);
    if (!productSKU) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product SKU not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product SKU fetched successfully',
      data: productSKU,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error fetching product SKU',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Create a new product SKU
export const createProductSKU = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newProductSKU = new ProductSKU(req.body);
    await newProductSKU.save();
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: 'Product SKU created successfully',
      data: newProductSKU,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error creating product SKU',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a product SKU
export const updateProductSKU = async (
  req: Request<ProductSKURequestParams>,
  res: Response
): Promise<void> => {
  try {
    const updatedProductSKU = await ProductSKU.findByIdAndUpdate(
      req.params.skuId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProductSKU) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product SKU not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product SKU updated successfully',
      data: updatedProductSKU,
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: 'Error updating product SKU',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a product SKU
export const deleteProductSKU = async (
  req: Request<ProductSKURequestParams>,
  res: Response
): Promise<void> => {
  try {
    const deletedProductSKU = await ProductSKU.findByIdAndDelete(
      req.params.skuId
    );
    if (!deletedProductSKU) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: 'Product SKU not found',
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: 'Product SKU deleted successfully',
    });
  } catch (error) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: 'Error deleting product SKU',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
