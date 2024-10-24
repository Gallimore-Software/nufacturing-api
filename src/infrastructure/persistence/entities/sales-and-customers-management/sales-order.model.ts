import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Customer } from './customer.model';
import { SalesOrderDetail } from './sales-order-detail.model';
import { SalesOrderStatus } from './sales-order-status.model';
import { ShippingDetails } from './shipping-details.model';

export class SalesOrder {
  @prop({ required: true })
  public orderId!: string;

  @prop({ ref: () => Customer })
  public customer!: Ref<Customer>;

  @prop({ required: true, type: () => [SalesOrderDetail] })
  public orderDetails!: SalesOrderDetail[];

  @prop({ ref: () => SalesOrderStatus })
  public status!: Ref<SalesOrderStatus>;

  @prop({ ref: () => ShippingDetails })
  public shippingDetails!: Ref<ShippingDetails>;

  @prop({ required: true })
  public orderDate!: Date;

  @prop()
  public notes?: string;
}

export const SalesOrderModel = getModelForClass(SalesOrder);
