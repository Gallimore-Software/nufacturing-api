import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { WarehouseLocation } from './warehouse-location.model';

export class Warehouse {
  @prop({ required: true })
  public warehouseId!: string;

  @prop({ required: true })
  public name!: string;

  @prop()
  public capacity?: number;

  @prop({ type: () => [WarehouseLocation] })
  public locations?: Ref<WarehouseLocation>[];
}

export const WarehouseModel = getModelForClass(Warehouse);
