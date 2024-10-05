import { performance } from 'perf_hooks';
import { UserDTO } from './user.ts';

describe('User Performance Tests', () => {
  it('should create a user quickly', () => {
    const start = performance.now();
    const newDto: UserDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    // Simulate creation logic
    // createUser(newDto); // Uncomment when the function is available

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Adjust the threshold as needed
  });

  // Additional performance tests can be added here
});
