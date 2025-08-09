import mongoose from 'mongoose';

export class FormulaId {
  private readonly value: mongoose.Types.ObjectId;

  constructor(value: mongoose.Types.ObjectId) {
    if (!mongoose.isValidObjectId(value)) {
      throw new Error('Invalid Formula ID');
    }
    this.value = value;
  }

  public getValue(): mongoose.Types.ObjectId {
    return this.value;
  }
}
