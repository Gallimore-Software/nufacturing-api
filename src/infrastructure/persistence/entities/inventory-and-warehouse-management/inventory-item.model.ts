import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { WarehouseLocation } from './warehouse-location.model';
import { InventoryStatus } from './inventory-status.model';
import { Lot } from './lot.model';
import { InventoryQuantity } from './inventory-item-quantity.model';
import { InventoryPrice } from './inventory-item-price.model';
import { InventoryExpiration } from './inventory-expiration.model';
import { RawMaterial } from './raw-material.model';
import { FinishedGood } from './finished-good.model';
import { PackagingMaterial } from './packaging-material.model';

export class InventoryItem {
  @prop({ required: true })
  public itemId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public sku!: string;

  @prop({ required: true })
  public category!: string;

  @prop({ enum: ['raw', 'wip', 'finished'], required: true })
  public type!: 'raw' | 'wip' | 'finished';

  @prop({ ref: () => WarehouseLocation })
  public location?: Ref<WarehouseLocation>;

  @prop({ ref: () => InventoryStatus })
  public status?: Ref<InventoryStatus>;

  @prop({ ref: () => Lot })
  public lot?: Ref<Lot>;

  @prop({ ref: () => InventoryQuantity })
  public quantity!: Ref<InventoryQuantity>;

  @prop({ ref: () => InventoryPrice })
  public price!: Ref<InventoryPrice>;

  @prop({ ref: () => InventoryExpiration })
  public expiration?: Ref<InventoryExpiration>;

  @prop({ ref: () => RawMaterial })
  public rawMaterial?: Ref<RawMaterial>;

  @prop({ ref: () => FinishedGood })
  public finishedGood?: Ref<FinishedGood>;

  @prop({ ref: () => PackagingMaterial })
  public packagingMaterial?: Ref<PackagingMaterial>;
}

export const InventoryItemModel = getModelForClass(InventoryItem);
