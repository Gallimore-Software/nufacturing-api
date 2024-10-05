import { performance } from 'perf_hooks';
import { UseDTO } from './use.ts';

describe('Use Performance Tests', () => {
  it('should create a use quickly', () => {
    const start = performance.now();
    const newDto: UseDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createUse(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
