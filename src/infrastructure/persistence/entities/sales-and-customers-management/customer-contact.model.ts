import { prop, getModelForClass } from '@typegoose/typegoose';

export class CustomerContact {
  @prop({ required: true })
  public contactId!: string;

  @prop({ required: true })
  public customerId!: string;

  @prop({ required: true })
  public contactName!: string;

  @prop({ required: true })
  public email!: string;

  @prop()
  public phone?: string;

  @prop({ required: true })
  public role!: string; // e.g., Billing, Sales, Support
}

export const CustomerContactModel = getModelForClass(CustomerContact);
