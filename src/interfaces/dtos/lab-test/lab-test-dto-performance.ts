import { performance } from 'perf_hooks';
import { LabTestDTO } from './labTest.ts';

describe('LabTest Performance Tests', () => {
  it('should create a labTest quickly', () => {
    const start = performance.now();
    const newDto: LabTestDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createLabTest(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
