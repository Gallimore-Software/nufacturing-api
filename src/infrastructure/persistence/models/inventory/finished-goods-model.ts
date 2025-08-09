import mongoose, { Schema, Document } from 'mongoose';

export interface FinishedGoodsModel extends Document {
  productName: string;
  productSKU: string;
  productId: string;
  batchId: string;
  lotId: string;
  quantityAvailable: number;
  unitOfMeasure: string;
  costPerUnit: number;
  sellingPrice?: number;
  location: string;
  expirationDate?: Date;
  reorderLevel?: number;
  reservedQuantity: number;
  reservedForOrderId?: string;
  supplier: string;
  orderAllocationDetails?: string;
  status?: string;
  inventoryItem: mongoose.Schema.Types.ObjectId;
}

const FinishedGoodsSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productSKU: { type: String, required: true },
  productId: { type: String, required: true },
  batchId: { type: String, required: true },
  lotId: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
  costPerUnit: { type: Number, required: true },
  sellingPrice: { type: Number },
  location: { type: String, required: true },
  expirationDate: { type: Date },
  reorderLevel: { type: Number },
  reservedQuantity: { type: Number, required: true },
  reservedForOrderId: { type: String },
  supplier: { type: String, required: true },
  orderAllocationDetails: { type: String },
  status: { type: String },
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true,
  },
});

export default mongoose.model<FinishedGoodsModel>(
  'FinishedGoods',
  FinishedGoodsSchema
);
