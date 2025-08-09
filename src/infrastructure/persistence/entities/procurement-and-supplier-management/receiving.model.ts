import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { PurchaseOrder } from './purchase-order.model';

export class Receiving {
  @prop({ required: true })
  public receivingId!: string;

  @prop({ ref: () => PurchaseOrder })
  public purchaseOrder!: Ref<PurchaseOrder>;

  @prop({ required: true })
  public receivedDate!: Date;

  @prop({ required: true })
  public receivedBy!: string;

  @prop({ required: true })
  public quantityReceived!: number;

  @prop({ required: true })
  public condition!: string;

  @prop()
  public notes?: string;
}

export const ReceivingModel = getModelForClass(Receiving);
