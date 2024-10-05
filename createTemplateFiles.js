const fs = require("fs");
const path = require("path");

// Define configuration for template file paths
const fileSections = [
  // Application Layer
  {
    baseDir: 'plop-templates/application/event-handlers/',
    fileName: 'eventHandler',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/application/mapper/',
    fileName: 'mapper',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/application/services/',
    fileName: 'service',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/application/use-cases/',
    fileName: 'useCase',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },

  // Domain Layer
  {
    baseDir: 'plop-templates/domain/entities/',
    fileName: 'entity',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/domain/events/',
    fileName: 'event',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/domain/errors/',
    fileName: 'customError',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/domain/interfaces/repositories/',
    fileName: 'repositoryInterface',
    variations: ['ts'],
  },

  // Infrastructure Layer
  {
    baseDir: 'plop-templates/infrastructure/event-dispatchers/',
    fileName: 'eventDispatcher',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/logging/',
    fileName: 'logger',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/notifications/',
    fileName: 'notificationHandler',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/persistence/models/',
    fileName: 'model',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/persistence/repositories/',
    fileName: 'repository',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/scheduling/',
    fileName: 'scheduledTasks',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/infrastructure/config/',
    fileName: 'persistenceConfig',
    variations: ['ts'],
  },

  // Interface Layer
  {
    baseDir: 'plop-templates/interfaces/dtos/',
    fileName: 'dto',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/http/controllers/',
    fileName: 'controller',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/http/middlewares/',
    fileName: 'permissionsMiddleware',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/http/middlewares/',
    fileName: 'authMiddleware',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/http/middlewares/',
    fileName: 'validationMiddleware',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/http/routes/',
    fileName: 'routes',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/validation-schemas/',
    fileName: 'validationSchema',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },
  {
    baseDir: 'plop-templates/interfaces/swagger/',
    fileName: 'swagger',
    variations: ['ts', 'contract.ts', 'e2e.ts', 'integration.ts', 'performance.ts', 'security.ts', 'unit.ts'],
  },

  // Documentation
  {
    baseDir: 'plop-templates/docs/',
    fileName: 'readme',
    variations: ['md'],
  },
];

// Function to generate all file paths from configuration
function generateFilePaths(fileSections) {
  const filePaths = [];
  fileSections.forEach((section) => {
    section.variations.forEach((variation) => {
      filePaths.push(path.join(section.baseDir, `${section.fileName}.${variation}.hbs`));
    });
  });
  return filePaths;
}

const filePaths = generateFilePaths(fileSections);

// Function to create each file and its directories if not already present
const createFile = (filePath) => {
  const directory = path.dirname(filePath);

  // Create directories if they do not exist
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Create the file if it does not exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
    console.log(`Created: ${filePath}`);
  } else {
    console.log(`Already exists: ${filePath}`);
  }
};

// Iterate through each file path and create them
filePaths.forEach((filePath) => {
  createFile(filePath);
});

console.log("Template files creation completed.");
