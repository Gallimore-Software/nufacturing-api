import { ProductTypeDTO } from './productType.ts';
import { createProductType } from '@services/productTypeService'; // Update to the correct service path

describe('ProductType Integration Tests', () => {
  it('should successfully create a productType', async () => {
    const newDto: ProductTypeDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createProductType(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
