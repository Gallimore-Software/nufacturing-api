import { performance } from 'perf_hooks';
import { ProductSkuDTO } from './productSku.ts';

describe('ProductSku Performance Tests', () => {
  it('should create a productSku quickly', () => {
    const start = performance.now();
    const newDto: ProductSkuDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createProductSku(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
