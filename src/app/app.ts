import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";

// Schedule tasks
import "@scheduling/scheduledTasks";

// Importing database connection function
import connectDB from "@infrastructure/persistence/db";

// Import route handlers
import inventoryRoutes from "@interfaces/http/routes/inventory/inventory-routes";
import batchRecordsRoutes from "@interfaces/http/routes/quality-audits/batch-records-routes";
import receivingRoutes from "@interfaces/http/routes/receiving/receiving-routes";
import userRoutes from "@interfaces/http/routes/users/user-routes";
import formulaRoutes from "@interfaces/http/routes/product-development/formula-routes";
import productSkuRoutes from "@interfaces/http/routes/product-development/product-sku-routes";
import productTypeRoutes from "@interfaces/http/routes/product-development/product-type-routes";
import quoteRoutes from "@interfaces/http/routes/sales/quote-routes";
import orderRoutes from "@interfaces/http/routes/sales/order-routes";
import customerRoutes from "@interfaces/http/routes/sales/customer-routes";
import purchaseOrderRoutes from "@interfaces/http/routes/receiving/purchase-orders-routes";
import labTestingRoutes from "@interfaces/http/routes/research-and-development/lab-test-routes";
import vendorRoutes from "@interfaces/http/routes/vendors/vendor-routes";

// Import Swagger documentation
import swaggerDocument from "@docs/generated/swagger_output.json";

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/product-development/formulas", formulaRoutes);
app.use("/api/product-development/product-skus", productSkuRoutes);
app.use("/api/product-development/product-types", productTypeRoutes);
app.use("/api/sales/quotes", quoteRoutes);
app.use("/api/sales/orders", orderRoutes);
app.use("/api/sales/customers", customerRoutes);
app.use("/api/quality-audits/batch-records", batchRecordsRoutes);
app.use("/api/receiving/purchase-order", purchaseOrderRoutes);
app.use("/api/research-and-development/lab-testing", labTestingRoutes);
app.use("/api/receiving/receiving", receivingRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/inventory", inventoryRoutes);

// Serve Swagger documentation
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;
