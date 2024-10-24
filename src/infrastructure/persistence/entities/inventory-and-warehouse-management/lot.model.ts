import { prop, getModelForClass } from '@typegoose/typegoose';

export class Lot {
  @prop({ required: true })
  public lotId!: string;

  @prop({ required: true })
  public productionDate!: Date;

  @prop({ required: true })
  public expirationDate!: Date;

  @prop()
  public description?: string;
}

export const LotModel = getModelForClass(Lot);
