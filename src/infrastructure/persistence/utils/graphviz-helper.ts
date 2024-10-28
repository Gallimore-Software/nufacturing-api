import { existsSync, mkdirSync } from 'fs';
import graphviz from 'graphviz';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { 
  InventoryItem, 
  QuantityPrice, 
  WarehouseLocation,
  Supplier,
  Category
} 
from '../models/inventory/inventory-model'; // Regular imports work here, using '@' aliases complicates things :)


// Define the path for the output folder relative to the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputDir = join(__dirname, 'outputs');

// Ensure the 'outputs' folder exists, create if it doesn't
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

// Function to create ERD nodes for InventoryItem and QuantityPrice schemas dynamically
function createERDWithRelationships(fieldLimit = 10) {
  const g = graphviz.digraph('ERDGraph');

  // Create InventoryItem node with its fields
  const inventoryItemFields = `{InventoryItem | ${Object.keys(InventoryItem.schema.paths)
    .slice(0, fieldLimit)
    .map((path) => {
      const field = InventoryItem.schema.paths[path];
      const fieldType = field.instance || "Mixed";
      return `+ ${path}: ${fieldType}`;
    })
    .join(' | ')}}`;

  g.addNode('InventoryItem', {
    shape: 'record',
    label: inventoryItemFields,
  });

  // Create QuantityPrice node with its fields
  const quantityPriceFields = `{QuantityPrice | ${Object.keys(QuantityPrice.schema.paths)
    .map((path) => {
      const field = QuantityPrice.schema.paths[path];
      const fieldType = field.instance || "Mixed";
      return `+ ${path}: ${fieldType}`;
    })
    .join(' | ')}}`;

  g.addNode('QuantityPrice', {
    shape: 'record',
    label: quantityPriceFields,
  });

  // Create Supplier node with its fields
  const supplierFields = `{Supplier | ${Object.keys(Supplier.schema.paths)
    .map((path) => {
      const field = Supplier.schema.paths[path];
      const fieldType = field.instance || "Mixed";
      return `+ ${path}: ${fieldType}`;
    })
    .join(' | ')}}`;

  g.addNode('Supplier', {
    shape: 'record',
    label: supplierFields,
  });

  // Create Category node with its fields
  const categoryFields = `{Category | ${Object.keys(Category.schema.paths)
    .map((path) => {
      const field = Category.schema.paths[path];
      const fieldType = field.instance || "Mixed";
      return `+ ${path}: ${fieldType}`;
    })
    .join(' | ')}}`;

  g.addNode('Category', {
    shape: 'record',
    label: categoryFields,
  });  

  // Create WarehouseLocation node with its fields
  const warehouseLocationFields = `{WarehouseLocation | ${Object.keys(WarehouseLocation.schema.paths)
    .map((path) => {
      const field = WarehouseLocation.schema.paths[path];
      const fieldType = field.instance || "Mixed";
      return `+ ${path}: ${fieldType}`;
    })
    .join(' | ')}}`;

  g.addNode('WarehouseLocation', {
    shape: 'record',
    label: warehouseLocationFields,
  });   

  // Add relationships (edge)
  g.addEdge('InventoryItem', 'QuantityPrice', { label: 'has quantity price' });
  g.addEdge('InventoryItem', 'WarehouseLocation', { label: 'in location' });
  g.addEdge('InventoryItem', 'Supplier', { label: 'supplied by' });
  g.addEdge('InventoryItem', 'Category', { label: 'belongs to category' });

  // Output the graph to the 'outputs' folder as a PNG file
  const outputPath = join(outputDir, 'inventory_item_erd.png');
  g.output('png', outputPath, (err) => {
    if (err) {
      console.error('Error generating the diagram:', err);
    } else {
      console.log(
        `ERD diagram generated successfully! Saved at: ${outputPath}`
      );
    }
  });
}

// Generate the ERD, fieldLimits can also be specify here!
createERDWithRelationships();