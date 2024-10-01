"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const Quote = require("../../models/sales-model/quoteModel");
// Get all quotes
exports.getAllQuotes = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const quotes = yield Quote.find().populate(
        "accountManager productType formula ingredients",
      );
      res.status(200).json(quotes);
    } catch (err) {
      res.status(500).json({ message: "Error fetching quotes", error: err });
    }
  });
// Get quote by ID
exports.getQuoteById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const quote = yield Quote.findById(req.params.quoteId).populate(
        "accountManager productType formula ingredients",
      );
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      res.status(200).json(quote);
    } catch (err) {
      res.status(500).json({ message: "Error fetching quote", error: err });
    }
  });
// Create a new quote
exports.createQuote = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newQuote = new Quote(req.body);
      yield newQuote.save();
      res.status(201).json(newQuote);
    } catch (err) {
      res.status(400).json({ message: "Error creating quote", error: err });
    }
  });
// Update quote
exports.updateQuote = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const updatedQuote = yield Quote.findByIdAndUpdate(
        req.params.quoteId,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!updatedQuote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      res.status(200).json(updatedQuote);
    } catch (err) {
      res.status(400).json({ message: "Error updating quote", error: err });
    }
  });
// Delete quote
exports.deleteQuote = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedQuote = yield Quote.findByIdAndDelete(req.params.quoteId);
      if (!deletedQuote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      res.status(200).json({ message: "Quote deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting quote", error: err });
    }
  });
//# sourceMappingURL=quoteController.js.map
