import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

// Schedule tasks
import "@scheduling/scheduledTasks";

// Importing database connection function
import connectDB from "@infrastructure/persistence/db";

// Import route handlers
import inventoryRoutes from "@interfaces/http/routes/inventory/inventoryRoutes";
import batchRecordsRoutes from "@interfaces/http/routes/quality-audits/batchRecordsRoutes";
import receivingRoutes from "@interfaces/http/routes/receiving/receivingRoutes";
import userRoutes from "@interfaces/http/routes/users/user-routes";
import formulaRoutes from "@interfaces/http/routes/product-development/formulaRoutes";
import productSkuRoutes from "@interfaces/http/routes/product-development/productSkuRoutes";
import productTypeRoutes from "@interfaces/http/routes/product-development/productTypeRoutes";
import quoteRoutes from "@interfaces/http/routes/sales/quoteRoutes";
import orderRoutes from "@interfaces/http/routes/sales/orderRoutes";
import customerRoutes from "@interfaces/http/routes/sales/customerRoutes";
import purchaseOrderRoutes from "@interfaces/http/routes/receiving/purchaseOrderRoutes";
import labTestingRoutes from "@interfaces/http/routes/research-and-development/labTestingRoutes";
import vendorRoutes from "@interfaces/http/routes/vendor/vendorRoutes";

// Import Swagger documentation
import swaggerDocument from "@swagger/swaggerDocument";

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
