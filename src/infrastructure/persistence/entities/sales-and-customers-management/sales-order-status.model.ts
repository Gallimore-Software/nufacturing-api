import { prop, getModelForClass } from '@typegoose/typegoose';

export class SalesOrderStatus {
  @prop({ required: true })
  public statusId!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public timestamp!: Date;
}

export const SalesOrderStatusModel = getModelForClass(SalesOrderStatus);
