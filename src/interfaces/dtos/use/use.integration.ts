import { UseDTO } from './use.ts';
import { createUse } from '../services/useService'; // Update to the correct service path

describe('Use Integration Tests', () => {
  it('should successfully create a use', async () => {
    const newDto: UseDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createUse(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
