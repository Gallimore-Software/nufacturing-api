import { ReceivingDTO } from './receiving.ts';
import { createReceiving } from '@services/receivingService'; // Update to the correct service path

describe('Receiving Integration Tests', () => {
  it('should successfully create a receiving', async () => {
    const newDto: ReceivingDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createReceiving(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
