import { BatchRecordDTO } from './batchRecord.ts';
import { createBatchRecord } from '@services/batchRecordService'; // Update to the correct service path

describe('BatchRecord Integration Tests', () => {
  it('should successfully create a batchRecord', async () => {
    const newDto: BatchRecordDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createBatchRecord(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
