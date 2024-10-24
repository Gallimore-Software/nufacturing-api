import { prop, getModelForClass } from '@typegoose/typegoose';

export class CycleCounting {
  @prop({ required: true })
  public cycleCountId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public warehouseId!: string;

  @prop({ required: true })
  public countedBy!: string;

  @prop({ required: true })
  public countDate!: Date;

  @prop({ required: true })
  public countedQuantity!: number;

  @prop({ required: true })
  public actualQuantity!: number;
}

export const CycleCountingModel = getModelForClass(CycleCounting);
