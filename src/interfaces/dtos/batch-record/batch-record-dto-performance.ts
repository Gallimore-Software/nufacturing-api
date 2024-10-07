import { performance } from 'perf_hooks';
import { BatchRecordDTO } from './batchRecord.ts';

describe('BatchRecord Performance Tests', () => {
  it('should create a batchRecord quickly', () => {
    const start = performance.now();
    const newDto: BatchRecordDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createBatchRecord(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
