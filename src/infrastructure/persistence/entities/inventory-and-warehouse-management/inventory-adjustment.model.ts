import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryAdjustment {
  @prop({ required: true })
  public adjustmentId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public adjustedBy!: string;

  @prop({ required: true })
  public adjustmentType!: string; // e.g., "addition", "subtraction"

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public reason!: string;

  @prop({ required: true })
  public date!: Date;
}

export const InventoryAdjustmentModel = getModelForClass(InventoryAdjustment);
