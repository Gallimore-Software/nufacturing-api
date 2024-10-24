import { prop, getModelForClass } from '@typegoose/typegoose';

export class ShippingDetails {
  @prop({ required: true })
  public shippingId!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public shippingMethod!: string;

  @prop({ required: true })
  public trackingNumber!: string;

  @prop({ required: true })
  public expectedDeliveryDate!: Date;
}

export const ShippingDetailsModel = getModelForClass(ShippingDetails);
