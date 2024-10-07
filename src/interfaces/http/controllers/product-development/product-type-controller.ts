import ProductType from "@infrastructure/persistence/models/productTypeModel";
import { Request, Response } from "express";

// Define type for req.params
interface ProductTypeRequestParams {
  typeId: string;
}

// Get all product types
export const getAllProductTypes = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json({ success: true, data: productTypes });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching product types",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Get product type by ID
export const getProductTypeById = async (
  req: Request<ProductTypeRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const productType = await ProductType.findById(req.params.typeId);
    if (!productType) {
      res
        .status(404)
        .json({ success: false, message: "Product type not found" });
      return;
    }
    res.status(200).json({ success: true, data: productType });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching product type",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Create a new product type
export const createProductType = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const newProductType = new ProductType(req.body);
    await newProductType.save();
    res.status(201).json({ success: true, data: newProductType });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating product type",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Update product type
export const updateProductType = async (
  req: Request<ProductTypeRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const updatedProductType = await ProductType.findByIdAndUpdate(
      req.params.typeId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedProductType) {
      res
        .status(404)
        .json({ success: false, message: "Product type not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedProductType });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating product type",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Delete product type
export const deleteProductType = async (
  req: Request<ProductTypeRequestParams>,
  res: Response,
): Promise<void> => {
  try {
    const deletedProductType = await ProductType.findByIdAndDelete(
      req.params.typeId,
    );
    if (!deletedProductType) {
      res
        .status(404)
        .json({ success: false, message: "Product type not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product type deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting product type",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
