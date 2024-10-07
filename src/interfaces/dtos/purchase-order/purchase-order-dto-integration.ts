import { PurchaseOrderDTO } from './purchaseOrder.ts';
import { createPurchaseOrder } from '@services/purchaseOrderService'; // Update to the correct service path

describe('PurchaseOrder Integration Tests', () => {
  it('should successfully create a purchaseOrder', async () => {
    const newDto: PurchaseOrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createPurchaseOrder(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
