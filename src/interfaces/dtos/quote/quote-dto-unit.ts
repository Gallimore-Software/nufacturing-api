import { QuoteDTO } from './quote.ts';

describe('Quote Unit Tests', () => {
  it('should create a valid quoteDTO', () => {
    const dto: QuoteDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };

    expect(dto).toHaveProperty('id');
    expect(dto.name).toBe('Test Name');
  });

  // Additional unit tests can be added here
});
