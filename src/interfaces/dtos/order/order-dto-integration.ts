import { OrderDTO } from './order.ts';
import { createOrder } from '@services/orderService'; // Update to the correct service path

describe('Order Integration Tests', () => {
  it('should successfully create a order', async () => {
    const newDto: OrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createOrder(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
