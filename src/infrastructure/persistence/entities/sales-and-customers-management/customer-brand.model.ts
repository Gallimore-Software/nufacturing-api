import { prop, getModelForClass } from '@typegoose/typegoose';

export class CustomerBrand {
  @prop({ required: true })
  public brandId!: string;

  @prop({ required: true })
  public customerId!: string;

  @prop({ required: true })
  public brandName!: string;
}

export const CustomerBrandModel = getModelForClass(CustomerBrand);
