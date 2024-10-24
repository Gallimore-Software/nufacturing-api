import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { SalesOrder } from './sales-order.model';

export class CustomerPayment {
  @prop({ required: true })
  public paymentId!: string;

  @prop({ ref: () => SalesOrder })
  public orderId!: Ref<SalesOrder>;

  @prop({ required: true })
  public amountPaid!: number;

  @prop({ required: true })
  public paymentDate!: Date;

  @prop({ required: true })
  public paymentMethod!: string;
}

export const CustomerPaymentModel = getModelForClass(CustomerPayment);
