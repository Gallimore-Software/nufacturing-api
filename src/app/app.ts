import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";

// Schedule tasks
import "@scheduling/scheduled-tasks";

// Importing database connection function
import connectDB from "@infrastructure/persistence/db";

// Import route handlers
import inventoryRoutes from "@interfaces/http/routes/inventory/inventory-routes";


// Import Swagger documentation
import swaggerDocument from "@docs/generated/swagger_output.json";
import customerRoutes from "@interfaces/http/routes/customer/customer-routes";
import formulaRoutes from "@interfaces/http/routes/formula/formula-routes";
import orderRoutes from "@interfaces/http/routes/order/order-routes";
import productSkuRoutes from "@interfaces/http/routes/product-sku/product-sku-routes";
import productTypeRoutes from "@interfaces/http/routes/product-type/product-type-routes";
import purchaseOrderRoutes from "@interfaces/http/routes/purchase-order/purchase-order-routes";
import quoteRoutes from "@interfaces/http/routes/quote/quote-routes";
import receivingRoutes from "@interfaces/http/routes/receiving/receiving-routes";
import userRoutes from "@interfaces/http/routes/user/user-routes";
import vendorRoutes from "@interfaces/http/routes/vendor/vendor-routes";
import batchRecordRoutes from "@interfaces/http/routes/batch-record/batch-record-routes";
import labTestRoutes from "@interfaces/http/routes/lab-test/lab-test-routes";

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
app.use("/api/quality-audits/batch-records", batchRecordRoutes);
app.use("/api/receiving/purchase-order", purchaseOrderRoutes);
app.use("/api/research-and-development/lab-testing", labTestRoutes);
app.use("/api/receiving/receiving", receivingRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/inventory", inventoryRoutes);

// Serve Swagger documentation
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;
