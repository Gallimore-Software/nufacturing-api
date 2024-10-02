// VendorDTO.ts
export interface VendorDTO {
  _id?: string;
  displayName: string;
  companyName: string;
  companyWebsite?: string;
  createdBy: string;
}

// VendorEntity.ts
export class VendorEntity {
  static find() {
    throw new Error("Method not implemented.");
  }
  save() {
    throw new Error("Method not implemented.");
  }
  public _id?: string | undefined;
  public displayName: string;
  public companyName: string;
  public companyWebsite?: string;
  public createdBy: string;

  constructor(data: VendorDTO & { _id?: string }) {
    this._id = data._id;
    this.displayName = data.displayName;
    this.companyName = data.companyName;
    this.companyWebsite = data.companyWebsite;
    this.createdBy = data.createdBy;
  }

  // Example of some business logic method
  validate(): boolean {
    if (!this.displayName || !this.companyName) {
      throw new Error("Missing required fields");
    }
    return true;
  }
}

// VendorModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface VendorDocument extends Document {
  displayName: string;
  companyName: string;
  companyWebsite?: string;
  createdBy: string;
}

const VendorSchema = new Schema({
  displayName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  createdBy: { type: String, required: true },
});

export const VendorModel = mongoose.model<VendorDocument>(
  "Vendor",
  VendorSchema,
);
