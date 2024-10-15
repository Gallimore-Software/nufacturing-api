import 'tsconfig-paths/register'; // To handle path aliases if necessary
import SwaggerGeneratorService from '../src/infrastructure/services/swagger-generator-service'; // Adjust import path if needed

const swaggerOptions = {
  outputFile: './docs/generated/swagger/swagger_output.json',
  endpointsFiles: ['src/interfaces/http/routes/**/*.routes.ts'], // Adjust to your routes
  additionalConfig: {}, // Optional configuration
  useHttps: true, // Set to true for https
  host: 'localhost',
  port: process.env.PORT || 3000,
  useAutogen: true, // Set to true for swagger-autogen or false for swagger-jsdoc
};

const swaggerService = new SwaggerGeneratorService(swaggerOptions);

// Generate Swagger documentation
swaggerService.generateDocumentation();
