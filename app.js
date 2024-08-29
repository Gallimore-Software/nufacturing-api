const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const formulaRoutes = require("./src/routes/product-development-routes/formulaRoutes");
const productSkuRoutes = require("./src/routes/product-development-routes/productSkusRoutes");
const productTypeRoutes = require("./src/routes/product-development-routes/productTypeRoutes");
const quoteRoutes = require("./src/routes/sales-routes/quoteRoutes");
const orderRoutes = require("./src/routes/sales-routes/orderRoutes");
const customerRoutes = require("./src/routes/sales-routes/customerRoutes");
const vendorRoutes = require("./src/routes/vendorRoutes");
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const purchaseOrderRoutes = require("./src/routes/receiving-routes/purchaseOrderRoutes");
const labTestingRoutes = require("./src/routes/research-and-development-routes/labTestingRoutes");
const receivingRoutes = require("./src/routes/receiving-routes/receivingRoutes");
const batchRecordsRoutes = require("./src/routes/quality-audits-routes/batchRecordsRoutes");
const swaggerUI = require("swagger-ui-express");
const openapi_swagger_specification_file = require("./swagger_output.json");

// Schedule tasks
require("./src/utils/scheduledTasks");

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
app.use(
  "/api",
  swaggerUI.serve,
  swaggerUI.setup(openapi_swagger_specification_file),
);

module.exports = app;
