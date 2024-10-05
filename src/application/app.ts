import express from "express";
import cors from "cors";
import connectDB from "@persistence/db";
import userRoutes from "@routes/users/usersRoutes";
import formulaRoutes from "@routes/product-development/formulasRoutes";
import productSkuRoutes from "@routes/product-development/productSkusRoutes";
import productTypeRoutes from "@routes/product-development/productTypesRoutes";
import quoteRoutes from "@routes/sales/quotesRoutes";
import orderRoutes from "@routes/sales/ordersRoutes";
import customerRoutes from "@routes/sales/customersRoutes";
import vendorRoutes from "@routes/vendors/vendorsRoutes";
import inventoryRoutes from "@routes/inventory/inventoryRoutes";
import purchaseOrderRoutes from "@routes/receiving/purchaseOrdersRoutes";
import labTestingRoutes from "@routes/research-and-development/labTestsRoutes";
import receivingRoutes from "@routes/receiving/receivingRoutes";
import batchRecordsRoutes from "@routes/quality-audits/batchRecordsRoutes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../../swagger_output.json";

// Schedule tasks
import "@scheduling/scheduledTasks";

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
