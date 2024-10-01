import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import formulaRoutes from "./src/routes/product-development-routes/formulaRoutes.js";
import productSkuRoutes from "./src/routes/product-development-routes/productSkusRoutes.js";
import productTypeRoutes from "./src/routes/product-development-routes/productTypeRoutes.js";
import quoteRoutes from "./src/routes/sales-routes/quoteRoutes.js";
import orderRoutes from "./src/routes/sales-routes/orderRoutes.js";
import customerRoutes from "./src/routes/sales-routes/customerRoutes.js";
import vendorRoutes from "./src/routes/vendorRoutes.js";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import purchaseOrderRoutes from "./src/routes/receiving-routes/purchaseOrderRoutes.js";
import labTestingRoutes from "./src/routes/research-and-development-routes/labTestingRoutes.js";
import receivingRoutes from "./src/routes/receiving-routes/receivingRoutes.js";
import batchRecordsRoutes from "./src/routes/quality-audits-routes/batchRecordsRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json" assert { type: "json" };

// Schedule tasks
import "./src/utils/scheduledTasks.js";

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
