import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { SalesOrder } from './sales-order.model';

export class CustomerInvoice {
  @prop({ required: true })
  public invoiceId!: string;

  @prop({ ref: () => SalesOrder })
  public orderId!: Ref<SalesOrder>;

  @prop({ required: true })
  public totalAmount!: number;

  @prop({ required: true })
  public invoiceDate!: Date;

  @prop({ required: true })
  public dueDate!: Date;

  @prop()
  public status?: string;
}

export const CustomerInvoiceModel = getModelForClass(CustomerInvoice);
