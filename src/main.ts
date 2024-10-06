import "module-alias/register";
import app from "./app/app";
import logger from "./infrastructure/logging/logger";

// Load the environment variables based on the NODE_ENV
logger.info("Starting API in :", process.env.NODE_ENV);

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
