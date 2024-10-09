export class ProductSKU {
  private readonly value: mongoose.Types.ObjectId;

  constructor(value: mongoose.Types.ObjectId) {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error("Invalid Product SKU ID");
    }
    this.value = value;
  }

  public getValue(): mongoose.Types.ObjectId {
    return this.value;
  }
}
