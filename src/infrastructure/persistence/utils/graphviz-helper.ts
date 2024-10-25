import { existsSync, mkdirSync } from 'fs';
import graphviz from 'graphviz';
import { join } from 'path';

// Define the path for the output folder relative to the current file
const outputDir = join(__dirname, 'outputs');

// Ensure the 'outputs' folder exists, create if it doesn't
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

const g = graphviz.digraph('ERDGraph'); // Directed graph for relationships

// Add entities (nodes) with attributes using record shapes
const order = g.addNode('Order', {
  shape: 'record',
  label: '{Order | +Attribute1 | +Attribute2 | +Attribute3}',
});

const orderDetail = g.addNode('OrderDetail', {
  shape: 'record',
  label: '{OrderDetail | +Attribute1 | +Attribute2 | +Attribute3}',
});

const orderStatus = g.addNode('OrderStatus', {
  shape: 'record',
  label: '{OrderStatus | +Attribute1 | +Attribute2 | +Attribute3}',
});

const customerInvoice = g.addNode('CustomerInvoice', {
  shape: 'record',
  label: '{CustomerInvoice | +Attribute1 | +Attribute2 | +Attribute3}',
});

const customerPayment = g.addNode('CustomerPayment', {
  shape: 'record',
  label: '{CustomerPayment | +Attribute1 | +Attribute2 | +Attribute3}',
});

const customerBrand = g.addNode('CustomerBrand', {
  shape: 'record',
  label: '{CustomerBrand | +Attribute1 | +Attribute2 | +Attribute3}',
});

const certificateOfComposition = g.addNode('CertificateOfComposition', {
  shape: 'record',
  label: '{CertificateOfComposition | +Attribute1 | +Attribute2 | +Attribute3}',
});

// Relationships (edges) - Assuming relationships between entities
g.addEdge(order, orderDetail, { label: 'contains' });
g.addEdge(order, orderStatus, { label: 'has status' });
g.addEdge(order, customerInvoice, { label: 'generates' });
g.addEdge(order, customerPayment, { label: 'is paid by' });
g.addEdge(order, customerBrand, { label: 'is for' });
g.addEdge(orderDetail, certificateOfComposition, { label: 'has certificate' });

// Output the graph to the 'outputs' folder as a PNG file
const outputPath = join(outputDir, 'orders.png');
g.output('png', outputPath, (err: unknown) => {
  if (err) {
    console.error('Error generating the diagram:', err);
  } else {
    console.log(
      `Crow's Foot style ERD diagram generated successfully! Saved at: ${outputPath}`
    );
  }
});
