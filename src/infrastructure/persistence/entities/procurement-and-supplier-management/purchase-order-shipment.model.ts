import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PurchaseOrder } from './purchase-order.model';

export class PurchaseOrderShipment {
  @prop({ required: true })
  public shipmentId!: string;

  @prop({ ref: () => PurchaseOrder })
  public purchaseOrder!: Ref<PurchaseOrder>;

  @prop({ required: true })
  public shippingProvider!: string;

  @prop({ required: true })
  public trackingNumber!: string;

  @prop({ required: true })
  public shipmentDate!: Date;

  @prop({ required: true })
  public expectedDeliveryDate!: Date;

  @prop()
  public notes?: string;
}

export const PurchaseOrderShipmentModel = getModelForClass(
  PurchaseOrderShipment
);
