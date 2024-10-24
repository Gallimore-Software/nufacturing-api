import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryForecasting {
  @prop({ required: true })
  public forecastId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public predictedDemand!: number;

  @prop({ required: true })
  public forecastDate!: Date;

  @prop({ required: true })
  public confidenceLevel!: number; // e.g., percentage (0-100%)

  @prop()
  public forecastMethod?: string;
}

export const InventoryForecastingModel = getModelForClass(InventoryForecasting);
