import { Request, Response, RequestHandler } from 'express';
import Receiving from '@infrastructure/persistence/models/receiving/receiving-model';
import PurchaseOrder from '@infrastructure/persistence/models/purchase-order/purchase-order-model';

// Define types for request parameters and request body
interface ReceivingRequestParams {
  receivingId?: string;
}

interface ReceivingRequestBody {
  poNumber: string;
  vendor: string;
  receivedItems: object[];
  receiver: string;
  comments?: string;
}

// Create a new receiving entry
export const createReceiving: RequestHandler = async (
  req: Request<object, object, ReceivingRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { poNumber, vendor, receivedItems, receiver, comments } = req.body;

    const poExists = await PurchaseOrder.findById(poNumber);
    if (!poExists) {
      return res
        .status(404)
        .json({ success: false, message: 'Purchase Order not found' });
    }

    const receiving = new Receiving({
      poNumber,
      vendor,
      receivedItems,
      receiver,
      comments,
    });
    await receiving.save();

    return res.status(201).json({ success: true, data: receiving });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating receiving entry',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all receiving entries
export const getAllReceivements: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const receivements = await Receiving.find()
      .populate('poNumber')
      .populate('vendor')
      .populate('receiver');

    return res.status(200).json({ success: true, data: receivements });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching receiving entries',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single receiving entry by ID
export const getReceivingById: RequestHandler<ReceivingRequestParams> = async (
  req: Request<ReceivingRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const receiving = await Receiving.findById(req.params.receivingId)
      .populate('poNumber')
      .populate('vendor')
      .populate('receiver');

    if (!receiving) {
      return res
        .status(404)
        .json({ success: false, message: 'Receiving entry not found' });
    }

    return res.status(200).json({ success: true, data: receiving });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching receiving entry',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a receiving entry by ID
export const updateReceivingById: RequestHandler<
  ReceivingRequestParams,
  object,
  ReceivingRequestBody
> = async (
  req: Request<ReceivingRequestParams, object, ReceivingRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { receivingId } = req.params;
    const updatedData = req.body;

    const receiving = await Receiving.findByIdAndUpdate(
      receivingId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!receiving) {
      return res
        .status(404)
        .json({ success: false, message: 'Receiving record not found' });
    }

    return res.status(200).json({ success: true, data: receiving });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating receiving entry',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a receiving entry by ID
export const deleteReceiving: RequestHandler<ReceivingRequestParams> = async (
  req: Request<ReceivingRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const receiving = await Receiving.findByIdAndDelete(req.params.receivingId);
    if (!receiving) {
      return res
        .status(404)
        .json({ success: false, message: 'Receiving entry not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Receiving entry deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting receiving entry',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
