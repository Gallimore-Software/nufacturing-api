// Load the environment variables based on the NODE_ENV
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
  });
  
  const app = require('./app');
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  