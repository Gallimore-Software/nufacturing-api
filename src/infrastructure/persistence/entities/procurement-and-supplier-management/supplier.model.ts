import { prop, getModelForClass } from '@typegoose/typegoose';

export class Supplier {
  @prop({ required: true })
  public supplierId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public contactName!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public phone!: string;

  @prop({ required: true })
  public address!: string;

  @prop()
  public certifications?: string[];

  @prop()
  public rating?: number;

  @prop()
  public notes?: string;
}

export const SupplierModel = getModelForClass(Supplier);
