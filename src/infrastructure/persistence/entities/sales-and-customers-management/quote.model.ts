import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Customer } from './customer.model';

export class Quote {
  @prop({ required: true })
  public quoteId!: string;

  @prop({ ref: () => Customer })
  public customer!: Ref<Customer>;

  @prop({ required: true })
  public validUntil!: Date;

  @prop({ required: true })
  public totalAmount!: number;

  @prop()
  public status?: string;

  @prop()
  public notes?: string;
}

export const QuoteModel = getModelForClass(Quote);
