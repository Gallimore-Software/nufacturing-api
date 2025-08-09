import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Supplier } from './supplier.model';

export class SupplierAudit {
  @prop({ required: true })
  public auditId!: string;

  @prop({ ref: () => Supplier })
  public supplier!: Ref<Supplier>;

  @prop({ required: true })
  public auditDate!: Date;

  @prop({ required: true })
  public complianceCheck!: string;

  @prop({ required: true })
  public result!: string;

  @prop()
  public notes?: string;
}

export const SupplierAuditModel = getModelForClass(SupplierAudit);
