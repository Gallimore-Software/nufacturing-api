import mongoose, { Schema, Document } from 'mongoose';

export interface WIPModel extends Document {
  wipId: string;
  productName: string;
  productSKU: string;
  batchId: string;
  lotId: string;
  stageOfProduction: string;
  quantityInProgress: number;
  costToDate: number;
  estimatedCompletionDate: Date;
  workOrderId: string;
  location: string;
  leadTimeRemaining: number;
  reservedForOrderId?: string;
  supplier: string;
  materialsAllocated?: string[];
  operatorTeam: string;
  status: string;
  inventoryItem: mongoose.Schema.Types.ObjectId;
}

const WIPSchema: Schema = new Schema({
  wipId: { type: String, required: true },
  productName: { type: String, required: true },
  productSKU: { type: String, required: true },
  batchId: { type: String, required: true },
  lotId: { type: String, required: true },
  stageOfProduction: { type: String, required: true },
  quantityInProgress: { type: Number, required: true },
  costToDate: { type: Number, required: true },
  estimatedCompletionDate: { type: Date, required: true },
  workOrderId: { type: String, required: true },
  location: { type: String, required: true },
  leadTimeRemaining: { type: Number, required: true },
  reservedForOrderId: { type: String },
  supplier: { type: String, required: true },
  materialsAllocated: { type: [String] },
  operatorTeam: { type: String, required: true },
  status: { type: String, required: true },
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true,
  },
});

export default mongoose.model<WIPModel>('WIP', WIPSchema);
