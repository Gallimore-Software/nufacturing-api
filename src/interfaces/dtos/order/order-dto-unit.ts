import { OrderDTO } from './order.ts';

describe('Order Unit Tests', () => {
  it('should create a valid orderDTO', () => {
    const dto: OrderDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    expect(dto).toHaveProperty('id');
    expect(dto.name).toBe('Test Name');
  });

  // Additional unit tests can be added here
});
