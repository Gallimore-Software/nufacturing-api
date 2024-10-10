// Define types for request parameters
export interface ReceivingRequestParams {
  receivingId: string;
}

// Define type for request body when creating/updating receiving entry
export interface ReceivingRequestBody {
  poNumber: string;
  vendor: string;
  receivedItems: object[];
  receiver: string;
  comments?: string;
}
