import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierScoreCard {
  @prop({ required: true })
  public scoreCardId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public onTimeDeliveryScore!: number;

  @prop({ required: true })
  public productQualityScore!: number;

  @prop({ required: true })
  public pricingScore!: number;

  @prop({ required: true })
  public overallScore!: number;

  @prop()
  public notes?: string;
}

export const SupplierScoreCardModel = getModelForClass(SupplierScoreCard);
