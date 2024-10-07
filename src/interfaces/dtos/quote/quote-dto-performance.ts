import { performance } from 'perf_hooks';
import { QuoteDTO } from './quote.ts';

describe('Quote Performance Tests', () => {
  it('should create a quote quickly', () => {
    const start = performance.now();
    const newDto: QuoteDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createQuote(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
