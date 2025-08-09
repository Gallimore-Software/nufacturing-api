import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PurchaseOrder } from './purchase-order.model';

export class PurchaseOrderTracking {
  @prop({ required: true })
  public trackingId!: string;

  @prop({ ref: () => PurchaseOrder })
  public purchaseOrder!: Ref<PurchaseOrder>;

  @prop({ required: true })
  public currentStatus!: string;

  @prop({ required: true })
  public trackingDetails!: string;

  @prop({ required: true })
  public expectedDeliveryDate!: Date;

  @prop()
  public notes?: string;
}

export const PurchaseOrderTrackingModel = getModelForClass(
  PurchaseOrderTracking
);
