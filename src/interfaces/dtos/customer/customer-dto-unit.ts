import { CustomerDTO } from './customer.ts';

describe('Customer Unit Tests', () => {
  it('should create a valid customerDTO', () => {
    const dto: CustomerDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    expect(dto).toHaveProperty('id');
    expect(dto.name).toBe('Test Name');
  });

  // Additional unit tests can be added here
});
