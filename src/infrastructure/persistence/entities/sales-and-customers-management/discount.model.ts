import { prop, getModelForClass } from '@typegoose/typegoose';

export class Discount {
  @prop({ required: true })
  public discountId!: string;

  @prop({ required: true })
  public percentage!: number;

  @prop()
  public validUntil?: Date;
}

export const DiscountModel = getModelForClass(Discount);
