import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "@docs/generated/swagger/swagger_output.json";

// Load environment variables
dotenv.config();

// Initialize allowed domains from environment variables
const allowedDomains = process.env.ALLOWED_DOMAINS ? process.env.ALLOWED_DOMAINS.split(",") : [];
const domainWhitelist = new DomainWhitelist(allowedDomains);

// Schedule tasks
import "@scheduling/scheduled-tasks";

// Importing database connection function
import connectDB from "@infrastructure/persistence/db";

// Import route handlers
import inventoryRoutes from "@interfaces/http/routes/inventory/inventory.routes";
import customerRoutes from "@interfaces/http/routes/customer/customer.routes";
import formulaRoutes from "@interfaces/http/routes/formula/formula.routes";
import orderRoutes from "@interfaces/http/routes/order/order.routes";
import productSkuRoutes from "@interfaces/http/routes/product-sku/product-sku.routes";
import productTypeRoutes from "@interfaces/http/routes/product-type/product-type.routes";
import purchaseOrderRoutes from "@interfaces/http/routes/purchase-order/purchase-order.routes";
import quoteRoutes from "@interfaces/http/routes/quote/quote.routes";
import receivingRoutes from "@interfaces/http/routes/receiving/receiving.routes";
import userRoutes from "@interfaces/http/routes/user/user.routes";
import vendorRoutes from "@interfaces/http/routes/vendor/vendor.routes";
import batchRecordRoutes from "@interfaces/http/routes/batch-record/batch-record.routes";
import labTestRoutes from "@interfaces/http/routes/lab-test/lab-test.routes";
import { DomainWhitelist } from "@domain/value-objects/domain-whitelist.value";

// Initialize express app
const app = express();

// Set up CORS middleware with domain whitelist
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || domainWhitelist.isAllowedDomain(new URL(origin).hostname)) {
      // If the origin is allowed or if there is no origin (like from Postman or a server-to-server request)
      callback(null, true);
    } else {
      // If the origin is not in the whitelist
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Apply the CORS middleware to all routes
app.use(cors(corsOptions));

// Middleware for parsing JSON requests
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
