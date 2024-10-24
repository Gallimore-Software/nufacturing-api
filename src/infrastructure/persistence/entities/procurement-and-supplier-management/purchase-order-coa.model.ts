import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PurchaseOrder } from './purchase-order.model';

export class PurchaseOrderCOA {
  @prop({ required: true })
  public coaId!: string;

  @prop({ ref: () => PurchaseOrder })
  public purchaseOrder!: Ref<PurchaseOrder>;

  @prop({ required: true })
  public coaNumber!: string;

  @prop({ required: true })
  public issueDate!: Date;

  @prop({ required: true })
  public result!: string;

  @prop()
  public notes?: string;
}

export const PurchaseOrderCOAModel = getModelForClass(PurchaseOrderCOA);
