import { VendorDTO } from './vendor.ts';
import { createVendor } from '@services/vendorService'; // Update to the correct service path

describe('Vendor Integration Tests', () => {
  it('should successfully create a vendor', async () => {
    const newDto: VendorDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createVendor(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
