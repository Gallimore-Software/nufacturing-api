const Quote = require("../../models/sales-model/quoteModel");

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate(
      "accountManager productType formula ingredients",
    );
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quotes", error: err });
  }
};

// Get quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.quoteId).populate(
      "accountManager productType formula ingredients",
    );
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quote", error: err });
  }
};

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: "Error creating quote", error: err });
  }
};

// Update quote
exports.updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
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
};

// Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.quoteId);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting quote", error: err });
  }
};
