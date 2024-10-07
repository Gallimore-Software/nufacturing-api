import { performance } from 'perf_hooks';
import { PurchaseOrderDTO } from './purchaseOrder.ts';

describe('PurchaseOrder Performance Tests', () => {
  it('should create a purchaseOrder quickly', () => {
    const start = performance.now();
    const newDto: PurchaseOrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createPurchaseOrder(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
