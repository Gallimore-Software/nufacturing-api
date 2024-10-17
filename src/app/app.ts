import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../../docs/generated/swagger/swagger_output.json';

// Initialize allowed domains from environment variables
const allowedDomains = process.env.ALLOWED_DOMAINS
  ? process.env.ALLOWED_DOMAINS.split(',')
  : [];
const allowAllOrigins = process.env.ALLOW_ALL_ORIGINS === 'true';
const enforceHttps = process.env.FORCE_HTTPS === 'true';

// Schedule tasks
import '@scheduling/scheduled-tasks';

// Importing database connection function
import connectDB from '@infrastructure/persistence/db';

// Import route handlers
import inventoryRoutes from '@interfaces/http/routes/inventory/inventory.routes';
import customerRoutes from '@interfaces/http/routes/customer/customer.routes';
import formulaRoutes from '@interfaces/http/routes/formula/formula.routes';
import orderRoutes from '@interfaces/http/routes/order/order.routes';
import productSkuRoutes from '@interfaces/http/routes/product-sku/product-sku.routes';
import productTypeRoutes from '@interfaces/http/routes/product-type/product-type.routes';
import purchaseOrderRoutes from '@interfaces/http/routes/purchase-order/purchase-order.routes';
import quoteRoutes from '@interfaces/http/routes/quote/quote.routes';
import receivingRoutes from '@interfaces/http/routes/receiving/receiving.routes';
import userRoutes from '@interfaces/http/routes/user/user.routes';
import vendorRoutes from '@interfaces/http/routes/vendor/vendor.routes';
import batchRecordRoutes from '@interfaces/http/routes/batch-record/batch-record.routes';
import labTestRoutes from '@interfaces/http/routes/lab-test/lab-test.routes';
import authRoutes from '@interfaces/http/routes/auth/auth.routes';
import { DomainWhitelist } from '@domain/value-objects/domain-whitelist.value';

// Initialize express app
const app = express();

// Set up CORS middleware with domain whitelist
const domainWhitelist = new DomainWhitelist(allowedDomains);
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // Allow all origins if the flag is set, or use the domain whitelist
    if (
      allowAllOrigins ||
      !origin ||
      domainWhitelist.isAllowedDomain(new URL(origin).hostname)
    ) {
      callback(null, true);
    } else {
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

// Middleware to force HTTPS if the flag is set
if (enforceHttps) {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/product-development/formulas', formulaRoutes);
app.use('/api/product-development/product-skus', productSkuRoutes);
app.use('/api/product-development/product-types', productTypeRoutes);
app.use('/api/sales/quotes', quoteRoutes);
app.use('/api/sales/orders', orderRoutes);
app.use('/api/sales/customers', customerRoutes);
app.use('/api/quality-audits/batch-records', batchRecordRoutes);
app.use('/api/receiving/purchase-order', purchaseOrderRoutes);
app.use('/api/research-and-development/lab-testing', labTestRoutes);
app.use('/api/receiving/receiving', receivingRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);

// Serve Swagger documentation
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default app;
