import { prop, getModelForClass } from '@typegoose/typegoose';

export class Customer {
  @prop({ required: true })
  public customerId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public phone?: string;

  @prop({ required: true })
  public billingAddress!: string;

  @prop()
  public shippingAddress?: string;

  @prop()
  public notes?: string;
}

export const CustomerModel = getModelForClass(Customer);
