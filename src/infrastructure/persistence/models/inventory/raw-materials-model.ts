import mongoose, { Schema, Document } from 'mongoose';

export interface RawMaterialsModel extends Document {
  materialName: string;
  materialId: string;
  quantityAvailable: number;
  reorderLevel?: number;
  costPerUnit: number;
  location: string;
  supplier: string;
  expirationDate?: Date;
  status?: string;
  inventoryItem: mongoose.Schema.Types.ObjectId;
}

const RawMaterialsSchema: Schema = new Schema({
  materialName: { type: String, required: true },
  materialId: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  reorderLevel: { type: Number },
  costPerUnit: { type: Number, required: true },
  location: { type: String, required: true },
  supplier: { type: String, required: true },
  expirationDate: { type: Date },
  status: { type: String },
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InventoryItem',
    required: true,
  },
});

export default mongoose.model<RawMaterialsModel>(
  'RawMaterials',
  RawMaterialsSchema
);
