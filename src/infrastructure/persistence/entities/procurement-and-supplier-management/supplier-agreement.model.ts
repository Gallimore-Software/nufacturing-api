import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierAgreement {
  @prop({ required: true })
  public agreementId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public agreementDate!: Date;

  @prop({ required: true })
  public terms!: string;

  @prop()
  public notes?: string;
}

export const SupplierAgreementModel = getModelForClass(SupplierAgreement);
