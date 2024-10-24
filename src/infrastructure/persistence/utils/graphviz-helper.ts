// import { writeFileSync } from 'fs';
import graphviz from 'graphviz';

// Create a graph representation of your ER Diagram
export const generateInventoryERDiagram = () => {
  const g = graphviz.digraph('ERDiagram');

  // Define nodes for the main entities in your schema
  // Entity: InventoryItem with attributes
  const inventoryItem = g.addNode('InventoryItem', {
    label: `"{InventoryItem | 
      itemId: String | 
      name: String | 
      sku: String | 
      category: ObjectId | 
      type: Enum | 
      pricePerUnit: Number | 
      vendor: ObjectId }"`,
    shape: 'record',
  });

  // Entity: Category with attributes
  const category = g.addNode('Category', {
    label: `"{Category | _id: ObjectId | name: String}"`,
    shape: 'record',
  });

  // Entity: Supplier with attributes
  const supplier = g.addNode('Supplier', {
    label: `"{Supplier | _id: ObjectId | name: String | contactDetails: String}"`,
    shape: 'record',
  });

  // Entity: WarehouseLocation with attributes
  const warehouseLocation = g.addNode('WarehouseLocation', {
    label: `"{WarehouseLocation | _id: ObjectId | locationName: String}"`,
    shape: 'record',
  });

  // Entity: User with attributes (who created the item)
  const user = g.addNode('User', {
    label: `"{User | _id: ObjectId | username: String | email: String}"`,
    shape: 'record',
  });

  // Define relationships (edges)
  g.addEdge(inventoryItem, category, { label: 'belongs to' });
  g.addEdge(inventoryItem, supplier, { label: 'provided by' });
  g.addEdge(inventoryItem, warehouseLocation, { label: 'stored in' });
  g.addEdge(inventoryItem, user, { label: 'created by' });

  // Output to file
  g.output('png', './inventory-er-diagram.png');
};

// Call the function to generate the ER Diagram
generateInventoryERDiagram();
