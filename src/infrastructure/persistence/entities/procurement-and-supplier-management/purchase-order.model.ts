import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class PurchaseOrder {
  @prop({ required: true })
  public purchaseOrderId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public orderDate!: Date;

  @prop({ required: true })
  public totalAmount!: number;

  @prop({ required: true })
  public deliveryDate!: Date;

  @prop({ required: true })
  public status!: string;

  @prop()
  public notes?: string;
}

export const PurchaseOrderModel = getModelForClass(PurchaseOrder);
