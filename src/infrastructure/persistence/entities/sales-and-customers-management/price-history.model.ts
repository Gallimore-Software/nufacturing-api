import { prop, getModelForClass } from '@typegoose/typegoose';

export class PriceHistory {
  @prop({ required: true })
  public productId!: string;

  @prop({ required: true })
  public oldPrice!: number;

  @prop({ required: true })
  public newPrice!: number;

  @prop({ required: true })
  public updatedDate!: Date;
}

export const PriceHistoryModel = getModelForClass(PriceHistory);
