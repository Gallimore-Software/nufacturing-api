import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { SalesOrder } from './sales-order.model';

export class ReturnOrder {
  @prop({ required: true })
  public returnId!: string;

  @prop({ ref: () => SalesOrder })
  public orderId!: Ref<SalesOrder>;

  @prop({ required: true })
  public returnReason!: string;

  @prop({ required: true })
  public returnDate!: Date;

  @prop({ required: true })
  public returnStatus!: string;
}

export const ReturnOrderModel = getModelForClass(ReturnOrder);
