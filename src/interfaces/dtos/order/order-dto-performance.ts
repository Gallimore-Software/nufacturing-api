import { performance } from 'perf_hooks';
import { OrderDTO } from './order.ts';

describe('Order Performance Tests', () => {
  it('should create a order quickly', () => {
    const start = performance.now();
    const newDto: OrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createOrder(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
