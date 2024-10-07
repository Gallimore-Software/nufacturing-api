import { InventoryDTO } from './inventory.ts';
import { createInventory } from '@services/inventoryService'; // Update to the correct service path

describe('Inventory Integration Tests', () => {
  it('should successfully create a inventory', async () => {
    const newDto: InventoryDTO = {
      id: '1',
      name: 'Test Name',
      // Add more properties as needed
    };
    
    const result = await createInventory(newDto);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newDto.name);
  });

  // Additional tests can be added here
});
