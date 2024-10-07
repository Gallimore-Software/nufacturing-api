import { QuoteDTO } from './quote.ts';
import { createQuote } from '@services/quoteService'; // Update to the correct service path

describe('Quote Integration Tests', () => {
  it('should successfully create a quote', async () => {
    const newDto: QuoteDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createQuote(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
