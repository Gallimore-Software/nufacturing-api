import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierPerformance {
  @prop({ required: true })
  public performanceId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public onTimeDelivery!: number;

  @prop({ required: true })
  public productQuality!: number;

  @prop({ required: true })
  public responsiveness!: number;

  @prop({ required: true })
  public overallScore!: number;

  @prop()
  public notes?: string;
}

export const SupplierPerformanceModel = getModelForClass(SupplierPerformance);
