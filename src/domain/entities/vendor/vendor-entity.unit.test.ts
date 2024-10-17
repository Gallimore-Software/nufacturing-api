import Vendor from '@entities/vendor/vendor';

describe('Vendor Entity Tests', () => {
  it('should create a valid vendor entity', () => {
    const vendor = new Vendor({
      id: '1',
      name: 'Rice Suppliers Ltd.',
      address: '123 Rice Lane',
      phoneNumber: '555-1234',
      email: 'contact@ricesuppliers.com',
      contactPerson: 'John Doe',
      isVerified: false,
    });

    expect(vendor.getName()).toBe('Rice Suppliers Ltd.');
    expect(vendor.getId()).toBe('1');
  });

  it('should throw an error when adding an invalid product', () => {
    const vendor = new Vendor({
      id: '2',
      name: 'Grain Masters',
      address: '456 Grain Ave',
      phoneNumber: '555-5678',
      email: 'info@grainmasters.com',
      contactPerson: 'Jane Doe',
      isVerified: false,
    });

    expect(() => {
      vendor.updateContactPerson('');
    }).toThrow('Product name cannot be empty');
  });

  it('should properly add a new product to the vendor', () => {
    const vendor = new Vendor({
      id: '3',
      name: 'Grain Masters',
      address: '456 Grain Ave',
      phoneNumber: '555-5678',
      email: 'info@grainmasters.com',
      contactPerson: 'Jane Doe',
      isVerified: false,
    });

    vendor.updateAddress('789 New Address');
    expect(vendor.getAddress()).toBe('789 New Address');
  });
});
