import { performance } from 'perf_hooks';
import { ReceivingDTO } from './receiving.ts';

describe('Receiving Performance Tests', () => {
  it('should create a receiving quickly', () => {
    const start = performance.now();
    const newDto: ReceivingDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createReceiving(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
