import { performance } from 'perf_hooks';
import { InventoryDTO } from './inventory.ts';

describe('Inventory Performance Tests', () => {
  it('should create a inventory quickly', () => {
    const start = performance.now();
    const newDto: InventoryDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createInventory(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
