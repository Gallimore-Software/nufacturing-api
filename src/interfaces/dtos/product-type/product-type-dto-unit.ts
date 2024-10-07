import { ProductTypeDTO } from './productType.ts';

describe('ProductType Unit Tests', () => {
  it('should create a valid productTypeDTO', () => {
    const dto: ProductTypeDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    expect(dto).toHaveProperty('id');
    expect(dto.name).toBe('Test Name');
  });

  // Additional unit tests can be added here
});
