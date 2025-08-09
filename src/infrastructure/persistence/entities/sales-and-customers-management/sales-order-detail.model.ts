import { prop, getModelForClass } from '@typegoose/typegoose';

export class SalesOrderDetail {
  @prop({ required: true })
  public productId!: string;

  @prop({ required: true })
  public productName!: string;

  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public price!: number;
}

export const SalesOrderDetailModel = getModelForClass(SalesOrderDetail);
