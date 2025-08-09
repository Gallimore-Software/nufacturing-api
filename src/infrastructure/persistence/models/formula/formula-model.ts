import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  perUnit: { type: Number, required: true },
});

const formulaSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: { type: String, required: true },
  productType: {
    type: String,
    enum: [
      'Capsules',
      'Powder',
      'Gummies',
      'Tinctures',
      'Powder Stickpacks',
      'Liquid Stickpacks',
      'Pouches',
    ],
    required: true,
  },
  unitOfMeasurement: { type: String, required: true },
  activeIngredients: [ingredientSchema],
  inactiveIngredients: [ingredientSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Formula = mongoose.model('Formula', formulaSchema);

export default Formula;
