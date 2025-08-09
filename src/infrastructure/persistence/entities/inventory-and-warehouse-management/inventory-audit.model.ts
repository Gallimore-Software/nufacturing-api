import { prop, getModelForClass } from '@typegoose/typegoose';

export class InventoryAudit {
  @prop({ required: true })
  public auditId!: string;

  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public auditor!: string;

  @prop({ required: true })
  public auditDate!: Date;

  @prop({ required: true })
  public discrepancies!: string;

  @prop()
  public notes?: string;
}

export const InventoryAuditModel = getModelForClass(InventoryAudit);
