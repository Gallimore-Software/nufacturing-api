import { prop, getModelForClass } from '@typegoose/typegoose';

export class WorkInProgress {
  @prop({ required: true })
  public wipId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public quantity!: number;
}

export const WorkInProgressModel = getModelForClass(WorkInProgress);
