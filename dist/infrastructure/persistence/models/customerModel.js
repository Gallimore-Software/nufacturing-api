"use strict";
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  displayName: { type: String, required: true },
  primaryContact: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  complianceContact: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  accountingContact: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  website: String,
  businessAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
  fulfillmentAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
//# sourceMappingURL=customerModel.js.map
