import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryMovement {
  @prop({ required: true })
  public movementId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public fromLocation!: string;

  @prop({ required: true })
  public toLocation!: string;

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public date!: Date;
}

export const InventoryMovementModel = getModelForClass(InventoryMovement);
