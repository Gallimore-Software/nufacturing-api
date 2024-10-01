const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const addressSchema = new mongoose.Schema({
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const vendorSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String },
  primaryContact: { type: contactSchema, required: true },
  complianceContact: { type: contactSchema },
  accountingContact: { type: contactSchema },
  businessAddress: { type: addressSchema, required: true },
  fulfillmentAddress: { type: addressSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
