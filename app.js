const express = require('express');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const formulaRoutes = require('./src/routes/product-development-routes/formulaRoutes');
const productSkuRoutes = require('./src/routes/product-development-routes/productSkusRoutes');
const productTypeRoutes = require('./src/routes/product-development-routes/productTypeRoutes');
const quoteRoutes = require('./src/routes/sales-routes/quoteRoutes');
const orderRoutes = require('./src/routes/sales-routes/orderRoutes');
const customerRoutes = require('./src/routes/sales-routes/customerRoutes');
const inventoryRoutes = require('./src/routes/inventoryRoutes');
const logger = require('./src/config/logger');
require('./src/utils/scheduledTasks');


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.use('/api/product-development/formulas', formulaRoutes);
app.use('/api/product-development/product-skus', productSkuRoutes);
app.use('/api/product-development/product-types', productTypeRoutes);

app.use('/api/sales/quotes', quoteRoutes);
app.use('/api/sales/orders', orderRoutes);
app.use('/api/sales/customers', customerRoutes);

app.use('/api/inventory', inventoryRoutes);

module.exports = app;