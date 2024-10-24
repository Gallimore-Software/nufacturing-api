import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryStatus {
  @prop({ required: true })
  public statusId!: string;

  @prop({
    enum: ['in-stock', 'on-hold', 'quarantined', 'under-inspection'],
    required: true,
  })
  public status!: 'in-stock' | 'on-hold' | 'quarantined' | 'under-inspection';

  @prop()
  public description?: string;
}

export const InventoryStatusModel = getModelForClass(InventoryStatus);
