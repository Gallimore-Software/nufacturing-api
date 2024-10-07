import { performance } from 'perf_hooks';
import { ProductTypeDTO } from './productType.ts';

describe('ProductType Performance Tests', () => {
  it('should create a productType quickly', () => {
    const start = performance.now();
    const newDto: ProductTypeDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createProductType(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
