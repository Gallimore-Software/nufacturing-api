import ProductSKU from "@models/productSKUModel";

// Get all product SKUs
export const getAllProductSKUs = async (req, res) => {
  try {
    const productSKUs = await ProductSKU.find().populate("formula");
    res.status(200).json(productSKUs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product SKUs", error: err });
  }
};

// Get product SKU by ID
export const getProductSKUById = async (req, res) => {
  try {
    const productSKU = await ProductSKU.findById(req.params.skuId).populate(
      "formula",
    );
    if (!productSKU) {
      return res.status(404).json({ message: "Product SKU not found" });
    }
    res.status(200).json(productSKU);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product SKU", error: err });
  }
};

// Create a new product SKU
export const createProductSKU = async (req, res) => {
  try {
    const newProductSKU = new ProductSKU(req.body);
    await newProductSKU.save();
    res.status(201).json(newProductSKU);
  } catch (err) {
    res.status(400).json({ message: "Error creating product SKU", error: err });
  }
};

// Update product SKU
export const updateProductSKU = async (req, res) => {
  try {
    const updatedProductSKU = await ProductSKU.findByIdAndUpdate(
      req.params.skuId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedProductSKU) {
      return res.status(404).json({ message: "Product SKU not found" });
    }
    res.status(200).json(updatedProductSKU);
  } catch (err) {
    res.status(400).json({ message: "Error updating product SKU", error: err });
  }
};

// Delete product SKU
export const deleteProductSKU = async (req, res) => {
  try {
    const deletedProductSKU = await ProductSKU.findByIdAndDelete(
      req.params.skuId,
    );
    if (!deletedProductSKU) {
      return res.status(404).json({ message: "Product SKU not found" });
    }
    res.status(200).json({ message: "Product SKU deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product SKU", error: err });
  }
};
