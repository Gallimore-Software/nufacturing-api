import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryExpiration {
  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public expirationDate!: Date;

  @prop()
  public alertBeforeDays?: number;
}

export const InventoryExpirationModel = getModelForClass(InventoryExpiration);
