import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierInvoice {
  @prop({ required: true })
  public invoiceId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public totalAmount!: number;

  @prop({ required: true })
  public invoiceDate!: Date;

  @prop({ required: true })
  public dueDate!: Date;

  @prop({ required: true })
  public status!: string;

  @prop()
  public notes?: string;
}

export const SupplierInvoiceModel = getModelForClass(SupplierInvoice);
