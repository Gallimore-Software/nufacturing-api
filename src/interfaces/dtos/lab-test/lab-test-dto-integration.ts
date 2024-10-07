import { LabTestDTO } from './labTest.ts';
import { createLabTest } from '@services/labTestService'; // Update to the correct service path

describe('LabTest Integration Tests', () => {
  it('should successfully create a labTest', async () => {
    const newDto: LabTestDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createLabTest(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
