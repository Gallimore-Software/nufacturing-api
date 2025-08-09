import { Request, Response, RequestHandler } from 'express';
import PurchaseOrder from '@infrastructure/persistence/models/purchase-order/purchase-order-model';

// Define types for request parameters and request body
interface PurchaseOrderRequestParams {
  purchaseOrderId?: string;
}

interface PurchaseOrderRequestBody {
  orderNumber: string;
  vendor: string;
  orderItems: object[];
  totalPrice: number;
  status: string;
  comments?: string;
}

// Create a new purchase order
export const createPurchaseOrder: RequestHandler = async (
  req: Request<object, object, PurchaseOrderRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { orderNumber, vendor, orderItems, totalPrice, status, comments } =
      req.body;

    // Create the purchase order entry
    const purchaseOrder = new PurchaseOrder({
      orderNumber,
      vendor,
      orderItems,
      totalPrice,
      status,
      comments,
    });

    await purchaseOrder.save();
    return res.status(201).json({ success: true, data: purchaseOrder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating purchase order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get all purchase orders
export const getAllPurchaseOrders: RequestHandler = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const purchaseOrders = await PurchaseOrder.find()
      .populate('vendor')
      .populate('orderItems');
    return res.status(200).json({ success: true, data: purchaseOrders });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching purchase orders',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get a single purchase order by ID
export const getPurchaseOrderById: RequestHandler<
  PurchaseOrderRequestParams
> = async (
  req: Request<PurchaseOrderRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(
      req.params.purchaseOrderId
    )
      .populate('vendor')
      .populate('orderItems');

    if (!purchaseOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Purchase order not found' });
    }

    return res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching purchase order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Update a purchase order by ID
export const updatePurchaseOrderById: RequestHandler<
  PurchaseOrderRequestParams,
  object,
  PurchaseOrderRequestBody
> = async (
  req: Request<PurchaseOrderRequestParams, object, PurchaseOrderRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { purchaseOrderId } = req.params;
    const updatedData = req.body;

    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      purchaseOrderId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!purchaseOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Purchase order not found' });
    }

    return res.status(200).json({ success: true, data: purchaseOrder });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating purchase order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Delete a purchase order by ID
export const deletePurchaseOrderById: RequestHandler<
  PurchaseOrderRequestParams
> = async (
  req: Request<PurchaseOrderRequestParams>,
  res: Response
): Promise<Response> => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(
      req.params.purchaseOrderId
    );
    if (!purchaseOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Purchase order not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Purchase order deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting purchase order',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
