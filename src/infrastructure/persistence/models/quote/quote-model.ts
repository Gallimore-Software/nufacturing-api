import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  accountManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: { type: String, required: true },
  brandName: { type: String, required: true },
  customerCode: { type: String, required: true },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
  formula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Formula",
    required: true,
  },
  customerProvidedLotCode: { type: String },
  customerProvidedSku: { type: String },
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  packaging: {
    capsuleInfo: String,
    bottlingInfo: String,
    closureInfo: String,
    masterCartonInfo: String,
    otherComponentsInfo: String,
    labelInfo: String,
  },
  billOfMaterials: {
    packagingRequirements: String,
    volumePricingTable: String,
    MOQ: String,
    bestGP: String,
  },
  status: { type: String, enum: ["Active", "Expired"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
