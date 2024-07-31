const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  ingredientName: String,
  perUnit: Number,
  pricePerKG: Number,
  source: String,
  stockQuantity: Number,
  totalCost: Number
});

const nutrientSchema = new mongoose.Schema({
  nutrientName: String,
  amount: Number
});

const certificationSchema = new mongoose.Schema({
  certificationName: String,
  isSelected: Boolean
});

const formulaSchema = new mongoose.Schema({
  formulaName: String,
  formulaCode: String,
  productType: String,
  ingredients: [ingredientSchema],
  servingSize: Number,
  calories: Number,
  otherNutrients: [nutrientSchema],
  preparationInstructions: String,
  mixingInstructions: String,
  packagingInstructions: String,
  qualityControlTests: String,
  acceptanceCriteria: String,
  regulatoryRequirements: String,
  certifications: [certificationSchema],
  notes: String
});

module.exports = mongoose.model('Formula', formulaSchema);
