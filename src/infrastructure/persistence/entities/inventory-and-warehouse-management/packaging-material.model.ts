import { prop, getModelForClass } from '@typegoose/typegoose';

export class PackagingMaterial {
  @prop({ required: true })
  public packagingId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public quantity!: number;
}

export const PackagingMaterialModel = getModelForClass(PackagingMaterial);
