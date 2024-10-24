import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierCertificate {
  @prop({ required: true })
  public certificateId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public certificateType!: string;

  @prop({ required: true })
  public issueDate!: Date;

  @prop({ required: true })
  public expiryDate!: Date;

  @prop()
  public notes?: string;
}

export const SupplierCertificateModel = getModelForClass(SupplierCertificate);
