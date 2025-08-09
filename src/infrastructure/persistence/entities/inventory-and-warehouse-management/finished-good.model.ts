import { prop, getModelForClass } from '@typegoose/typegoose';

export class FinishedGood {
  @prop({ required: true })
  public finishedGoodId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public location!: string;
}

export const FinishedGoodModel = getModelForClass(FinishedGood);
