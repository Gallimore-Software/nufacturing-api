# Nufacturing Inventory Table Columns: Meanings and Definitions

This document provides detailed explanations of each column in the Nufacturing Inventory Table, covering **Finished Goods**, **Raw Materials**, **Components**, and **Work-in-Progress (WIP)** categories. These definitions aim to clarify the purpose of each field and help new team members understand the data and functionality within the Nufacturing inventory system.

## Table of Contents
- [Product Name](#product-name)
- [SKU (Stock Keeping Unit)](#sku)
- [Product ID](#product-id)
- [Batch ID](#batch-id)
- [Lot ID](#lot-id)
- [Quantity Available](#quantity-available)
- [Unit of Measure (UOM)](#unit-of-measure)
- [Cost Per Unit](#cost-per-unit)
- [Selling Price](#selling-price)
- [Location](#location)
- [Expiration Date](#expiration-date)
- [Reorder Level](#reorder-level)
- [Reserved Quantity](#reserved-quantity)
- [Reserved for Order ID](#reserved-for-order-id)
- [Supplier](#supplier)
- [Order Allocation Details](#order-allocation-details)
- [Status](#status)
- [Materials Allocated (For WIP)](#materials-allocated-for-wip)
- [Stage of Production (For WIP)](#stage-of-production-for-wip)
- [Work Order ID (For WIP)](#work-order-id-for-wip)
- [Cost to Date (For WIP)](#cost-to-date-for-wip)
- [Estimated Completion Date (For WIP)](#estimated-completion-date-for-wip)
- [Lead Time Remaining (For WIP)](#lead-time-remaining-for-wip)

---

### Product Name
- **Definition**: The full name of the product or material.
- **Example**: "Vitamin C 500mg Tablets".
- **Use**: This is the most human-readable field, used to identify the product or material at a glance.

### SKU (Stock Keeping Unit)
- **Definition**: A unique alphanumeric code assigned to each product to track inventory.
- **Example**: `SKU-1234`.
- **Use**: SKUs are typically used for sales, inventory management, and to distinguish between product variations like size or packaging.

### Product ID
- **Definition**: A unique identifier for the product within the system.
- **Example**: `P1001`.
- **Use**: Used internally to track specific products across multiple departments or systems.

### Batch ID
- **Definition**: A unique identifier assigned to a specific production batch of products.
- **Example**: `BATCH-001234`.
- **Use**: Used for traceability of products manufactured under the same conditions. Critical for quality control and compliance.

### Lot ID
- **Definition**: An identifier grouping products from multiple batches that share common attributes like expiration dates.
- **Example**: `LOT-5678`.
- **Use**: Used for traceability when dealing with large product volumes or logistics.

### Quantity Available
- **Definition**: The number of units currently available in stock for sale or production.
- **Example**: `500 units`.
- **Use**: Important for inventory control, ensuring sufficient stock levels for orders or manufacturing needs.

### Unit of Measure (UOM)
- **Definition**: The unit in which the product is measured (e.g., pieces, kilograms, bottles).
- **Example**: `Bottles`.
- **Use**: Helps standardize quantities for different product types.

### Cost Per Unit
- **Definition**: The cost to produce or procure a single unit of the product.
- **Example**: `$1.50`.
- **Use**: Crucial for cost management and pricing strategies.

### Selling Price
- **Definition**: The price at which the product is sold to customers.
- **Example**: `$9.99`.
- **Use**: This is customer-facing and used for sales and revenue tracking.

### Location
- **Definition**: The physical location of the product within the warehouse or production facility.
- **Example**: `Aisle 3, Bin 2`.
- **Use**: Helps warehouse teams locate the product for picking, packing, and shipping.

### Expiration Date
- **Definition**: The date by which the product must be used or sold before it is considered expired.
- **Example**: `2025-12-31`.
- **Use**: Used to manage inventory rotation, particularly for products with a limited shelf life.

### Reorder Level
- **Definition**: The stock level at which a reorder should be triggered to avoid running out.
- **Example**: `200 units`.
- **Use**: Helps ensure consistent availability by triggering replenishment before stock levels are too low.

### Reserved Quantity
- **Definition**: The number of units that have been reserved for customer orders but not yet shipped.
- **Example**: `100 units`.
- **Use**: Ensures that reserved inventory is not accidentally used for other purposes.

### Reserved for Order ID
- **Definition**: The specific order ID for which the stock has been reserved.
- **Example**: `ORDER-5678`.
- **Use**: Links reserved inventory to specific sales orders or production batches.

### Supplier
- **Definition**: The supplier from whom the raw materials or finished goods are sourced.
- **Example**: `Supplier A`.
- **Use**: Used for procurement, supplier management, and traceability.

### Order Allocation Details
- **Definition**: Detailed information on how stock is allocated across multiple customer or production orders.
- **Example**: `Order-1234 (50 units), Order-5678 (100 units)`.
- **Use**: Provides clarity on stock distribution and order fulfillment.

### Status
- **Definition**: The current stock status, usually color-coded (e.g., green for "In Stock", red for "Out of Stock").
- **Example**: `In Stock`, `Low Stock`, `Out of Stock`.
- **Use**: Provides a quick visual cue on the availability of inventory.

---

### Materials Allocated (For WIP)
- **Definition**: The materials allocated to a specific work-in-progress (WIP) batch.
- **Example**: `500kg Vitamin C Powder, 1,000 Bottles`.
- **Use**: Ensures that the right materials are allocated for ongoing production processes.

### Stage of Production (For WIP)
- **Definition**: The current stage of the production process (e.g., Bottling, Packaging, Labeling).
- **Example**: `Packaging`.
- **Use**: Provides visibility into where the product is within the production workflow.

### Work Order ID (For WIP)
- **Definition**: A unique identifier for the work order associated with the WIP batch.
- **Example**: `WO-5678`.
- **Use**: Links WIP batches to specific production work orders for traceability.

### Cost to Date (For WIP)
- **Definition**: The cumulative cost incurred so far for the production of the WIP batch.
- **Example**: `$3,500`.
- **Use**: Important for tracking production expenses and managing budgets.

### Estimated Completion Date (For WIP)
- **Definition**: The projected date by which the WIP batch will be completed.
- **Example**: `2024-10-20`.
- **Use**: Helps in planning production timelines and managing expectations for delivery.

### Lead Time Remaining (For WIP)
- **Definition**: The estimated time remaining to complete the production process.
- **Example**: `2 days`.
- **Use**: Provides insight into production timelines and allows for adjustments if delays occur.

---

## Usage in Documentation and Development

- **Alt-Text**: These definitions will also serve as useful alt-text when users hover over column titles in the table.
- **FAQ/Help Section**: This content will eventually be added as a help resource or FAQ to assist users in understanding the table column meanings.
- **ReadMe Inclusion**: You can add this section to the **Nufacturing-API README.md** or create a dedicated document under the documentation folder.

This document is meant to clarify any questions about the columns and help onboard new users or developers efficiently.

