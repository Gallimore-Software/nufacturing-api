import { CustomerDTO } from './customer.ts';
import { createCustomer } from '@services/customerService'; // Update to the correct service path

describe('Customer Integration Tests', () => {
  it('should successfully create a customer', async () => {
    const newDto: CustomerDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createCustomer(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
