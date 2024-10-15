import swaggerAutogen from 'swagger-autogen';
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import Logger from '../../infrastructure/logging/logger'; // Importing the custom Logger

interface SwaggerGeneratorOptions {
  outputFile: string;
  endpointsFiles: string[];
  additionalConfig?: any; // Optional, additional Swagger configurations
  useHttps?: boolean; // Optional flag to switch between http and https
  host?: string; // Optional custom host (e.g., localhost or production URL)
  port?: string | number; // Optional custom port
  useAutogen?: boolean; // Flag to switch between swagger-autogen and swagger-jsdoc
}

class SwaggerGeneratorService {
  private options: SwaggerGeneratorOptions;

  constructor(options: SwaggerGeneratorOptions) {
    this.options = options;
  }

  // Ensure the directory exists and create it if not
  private ensureDirectoryExists(filePath: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      Logger.info(`Created directory: ${dir}`);
    }
  }

  // Swagger-Autogen Generator
  private async generateAutogenDocumentation(): Promise<void> {
    try {
      Logger.info(
        'Starting Swagger documentation generation using swagger-autogen...'
      );

      // Determine the scheme based on the useHttps flag
      const scheme = this.options.useHttps ? 'https' : 'http';
      const host = this.options.host || 'localhost';
      const port = this.options.port || 3000;

      // Swagger configuration
      const swaggerConfig = {
        info: {
          title: 'API Documentation',
          description: 'API docs for all available endpoints',
        },
        host: `${host}:${port}`,
        schemes: [scheme],
        ...this.options.additionalConfig,
      };

      // Ensure the directory for the output file exists
      this.ensureDirectoryExists(this.options.outputFile);

      // Generate Swagger documentation
      await swaggerAutogen()(
        this.options.outputFile,
        this.options.endpointsFiles,
        swaggerConfig
      );

      Logger.info(
        `Swagger documentation generated successfully at: ${this.options.outputFile}`
      );
    } catch (error) {
      Logger.error(
        'Failed to generate Swagger documentation using swagger-autogen',
        { error }
      );
    }
  }

  // Swagger-JSDoc Generator
  private generateJsdocDocumentation(): void {
    try {
      Logger.info(
        'Starting Swagger documentation generation using swagger-jsdoc...'
      );

      const swaggerOptions = {
        swaggerDefinition: {
          openapi: '3.0.0',
          info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API docs for all available endpoints',
          },
          host: `${this.options.host}:${this.options.port}`, // Adjust based on host and port
          schemes: [this.options.useHttps ? 'https' : 'http'], // Adjust scheme
        },
        apis: this.options.endpointsFiles,
      };

      const swaggerSpec = swaggerJsdoc(swaggerOptions);

      // Ensure the directory for the output file exists
      this.ensureDirectoryExists(this.options.outputFile);

      // Save the swagger output to a JSON file
      fs.writeFileSync(
        path.resolve(__dirname, this.options.outputFile),
        JSON.stringify(swaggerSpec, null, 2)
      );

      Logger.info(
        `Swagger documentation generated successfully at: ${this.options.outputFile}`
      );
    } catch (error) {
      Logger.error(
        'Failed to generate Swagger documentation using swagger-jsdoc',
        { error }
      );
    }
  }

  // Method to choose which generator to use
  public async generateDocumentation(): Promise<void> {
    if (this.options.useAutogen) {
      await this.generateAutogenDocumentation();
    } else {
      this.generateJsdocDocumentation();
    }
  }
}

export default SwaggerGeneratorService;
