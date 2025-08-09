import { prop, getModelForClass } from '@typegoose/typegoose';

export class StockReorder {
  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public reorderPoint!: number;

  @prop({ required: true })
  public reorderQuantity!: number;
}

export const StockReorderModel = getModelForClass(StockReorder);
