import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryReturn {
  @prop({ required: true })
  public returnId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public reason!: string;

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public returnDate!: Date;

  @prop({ required: true })
  public processedBy!: string;
}

export const InventoryReturnModel = getModelForClass(InventoryReturn);
