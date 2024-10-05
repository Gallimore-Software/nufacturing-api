import Quote from "@infra/persistence/models/quoteModel";
import { Request, Response } from "express";

// Define types for request parameters
interface QuoteRequestParams {
  quoteId: string;
}

// Utility function for standardized response handling
const sendResponse = <T>({
  res,
  statusCode,
  success,
  message,
  data,
  error,
}: {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}): void => {
  res.status(statusCode).json({
    success,
    message,
    ...(data !== undefined && { data }),
    ...(error && { error }),
  });
};

// Get all quotes
export const getAllQuotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const quotes = await Quote.find().populate(
      "accountManager productType formula ingredients"
    );
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Quotes fetched successfully",
      data: quotes,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error fetching quotes",
      error: (err as Error).message,
    });
  }
};

// Get quote by ID
export const getQuoteById = async (
  req: Request<QuoteRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const quote = await Quote.findById(req.params.quoteId).populate(
      "accountManager productType formula ingredients"
    );
    if (!quote) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: "Quote not found",
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Quote fetched successfully",
      data: quote,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error fetching quote",
      error: (err as Error).message,
    });
  }
};

// Create a new quote
export const createQuote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    sendResponse({
      res,
      statusCode: 201,
      success: true,
      message: "Quote created successfully",
      data: newQuote,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: "Error creating quote",
      error: (err as Error).message,
    });
  }
};

// Update quote
export const updateQuote = async (
  req: Request<QuoteRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.quoteId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedQuote) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: "Quote not found",
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Quote updated successfully",
      data: updatedQuote,
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 400,
      success: false,
      message: "Error updating quote",
      error: (err as Error).message,
    });
  }
};

// Delete quote
export const deleteQuote = async (
  req: Request<QuoteRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.quoteId);
    if (!deletedQuote) {
      sendResponse({
        res,
        statusCode: 404,
        success: false,
        message: "Quote not found",
      });
      return;
    }
    sendResponse({
      res,
      statusCode: 200,
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (err) {
    sendResponse({
      res,
      statusCode: 500,
      success: false,
      message: "Error deleting quote",
      error: (err as Error).message,
    });
  }
};
