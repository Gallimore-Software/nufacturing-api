import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryPrice {
  @prop({ required: true })
  public currentPrice!: number;

  @prop()
  public priceHistory?: { price: number; date: Date }[];
}

export const InventoryPriceModel = getModelForClass(InventoryPrice);
