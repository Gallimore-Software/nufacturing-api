import { Request, Response, RequestHandler } from 'express';
import Quote from '@infrastructure/persistence/models/quote/quote-model';

// Define types for request parameters and request body
interface QuoteRequestParams {
  quoteId?: string;
}

interface QuoteRequestBody {
  client: string;
  items: object[];
  totalAmount: number;
  status: string;
  validUntil: Date;
  comments?: string;
}

// Create a new quote
export const createQuote: RequestHandler = async (
  req: Request<object, object, QuoteRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { client, items, totalAmount, status, validUntil, comments } =
      req.body;

    // Create the quote entry
    const quote = new Quote({
      client,
      items,
      totalAmount,
      status,
      validUntil,
      comments,
    });

    await quote.save();
    return res.status(201).json({ success: true, data: quote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating quote',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all quotes
export const getAllQuotes: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const quotes = await Quote.find().populate('client').populate('items');
    return res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching quotes',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single quote by ID
export const getQuoteById: RequestHandler<QuoteRequestParams> = async (
  req: Request<QuoteRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const quote = await Quote.findById(req.params.quoteId)
      .populate('client')
      .populate('items');

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: 'Quote not found' });
    }

    return res.status(200).json({ success: true, data: quote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching quote',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a quote by ID
export const updateQuote: RequestHandler<
  QuoteRequestParams,
  object,
  QuoteRequestBody
> = async (
  req: Request<QuoteRequestParams, object, QuoteRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { quoteId } = req.params;
    const updatedData = req.body;

    const quote = await Quote.findByIdAndUpdate(quoteId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: 'Quote not found' });
    }

    return res.status(200).json({ success: true, data: quote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating quote',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a quote by ID
export const deleteQuote: RequestHandler<QuoteRequestParams> = async (
  req: Request<QuoteRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.quoteId);

    if (!quote) {
      return res
        .status(404)
        .json({ success: false, message: 'Quote not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting quote',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
