import { performance } from 'perf_hooks';
import { FormulaDTO } from './formula.ts';

describe('Formula Performance Tests', () => {
  it('should create a formula quickly', () => {
    const start = performance.now();
    const newDto: FormulaDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createFormula(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
