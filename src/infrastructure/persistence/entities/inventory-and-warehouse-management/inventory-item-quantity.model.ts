import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryQuantity {
  @prop({ required: true })
  public inStock!: number;

  @prop({ required: true })
  public available!: number;

  @prop()
  public onHold?: number;

  @prop()
  public quarantined?: number;
}

export const InventoryQuantityModel = getModelForClass(InventoryQuantity);
