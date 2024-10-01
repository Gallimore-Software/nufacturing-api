import ProductType from "@models/productTypeModel";

// Get all product types
export const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product types", error: err });
  }
};

// Get product type by ID
export const getProductTypeById = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.typeId);
    if (!productType) {
      return res.status(404).json({ message: "Product type not found" });
    }
    res.status(200).json(productType);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product type", error: err });
  }
};

// Create a new product type
export const createProductType = async (req, res) => {
  try {
    const newProductType = new ProductType(req.body);
    await newProductType.save();
    res.status(201).json(newProductType);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error creating product type", error: err });
  }
};

// Update product type
export const updateProductType = async (req, res) => {
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
      return res.status(404).json({ message: "Product type not found" });
    }
    res.status(200).json(updatedProductType);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating product type", error: err });
  }
};

// Delete product type
export const deleteProductType = async (req, res) => {
  try {
    const deletedProductType = await ProductType.findByIdAndDelete(
      req.params.typeId,
    );
    if (!deletedProductType) {
      return res.status(404).json({ message: "Product type not found" });
    }
    res.status(200).json({ message: "Product type deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product type", error: err });
  }
};
