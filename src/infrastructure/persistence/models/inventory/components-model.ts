import mongoose, { Schema, Document } from 'mongoose';

export interface ComponentsModel extends Document {
  componentName: string;
  componentId: string;
  quantityAvailable: number;
  reorderLevel?: number;
  costPerUnit: number;
  location: string;
  supplier: string;
  minOrderQty: number;
  status?: string;
  inventoryItem: mongoose.Schema.Types.ObjectId;
}

const ComponentsSchema: Schema = new Schema({
  componentName: { type: String, required: true },
  componentId: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  reorderLevel: { type: Number },
  costPerUnit: { type: Number, required: true },
  location: { type: String, required: true },
  supplier: { type: String, required: true },
  minOrderQty: { type: Number, required: true },
  status: { type: String },
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true,
  },
});

export default mongoose.model<ComponentsModel>('Components', ComponentsSchema);
