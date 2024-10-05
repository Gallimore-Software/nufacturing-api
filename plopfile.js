module.exports = function (plop) {
  function generateActions(entityType, folderPath) {
    const files = [
      '.contract.ts.hbs',
      '.e2e.ts.hbs',
      '.integration.ts.hbs',
      '.performance.ts.hbs',
      '.security.ts.hbs',
      '.unit.ts.hbs',
      '.ts.hbs',
    ];
  
    return files.map(file => ({
      type: 'add',
      path: `${folderPath}/{{camelCase name}}.${file.replace('.hbs', '')}`,
      templateFile: `${folderPath}/${entityType}${file}`, // Fix template file path
      abortOnFail: true, // Abort on failure to prevent cascading errors
      skipIfExists: true, // Skip file generation if it already exists
    }));
  }  

  // Common prompt for different types of entities
  const commonPrompts = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the entity?',
    },
  ];

  // Generators for each entity type
  const generators = [
    { name: 'eventHandler', description: 'Generate an event handler', folder: 'application/event-handlers' },
    { name: 'mapper', description: 'Generate a mapper', folder: 'application/mapper' },
    { name: 'service', description: 'Generate a service', folder: 'application/services' },
    { name: 'use-case', description: 'Generate a use case', folder: 'application/use-cases' },
    { name: 'entity', description: 'Generate an entity', folder: 'domain/entities' },
    { name: 'custom-error', description: 'Generate a custom error', folder: 'domain/errors' },
    { name: 'event', description: 'Generate an event', folder: 'domain/events' },
    { name: 'repositoryInterface', description: 'Generate a repository interface', folder: 'domain/interfaces/repositories' },
    { name: 'config', description: 'Generate a persistence config', folder: 'infrastructure/config' },
    { name: 'eventDispatcher', description: 'Generate an event dispatcher', folder: 'infrastructure/event-dispatchers' },
    { name: 'logger', description: 'Generate a logger', folder: 'infrastructure/logging' },
    { name: 'notificationHandler', description: 'Generate a notification handler', folder: 'infrastructure/notifications' },
    { name: 'model', description: 'Generate a model', folder: 'infrastructure/persistence/models' },
    { name: 'repository', description: 'Generate a repository', folder: 'infrastructure/persistence/repositories' },
    { name: 'scheduledTask', description: 'Generate a scheduled task', folder: 'infrastructure/scheduling' },
    { name: 'dto', description: 'Generate a DTO', folder: 'interfaces/dtos' },
    { name: 'controller', description: 'Generate a controller', folder: 'interfaces/http/controllers' },
    { name: 'route', description: 'Generate a route', folder: 'interfaces/http/routes' },
    { name: 'swagger', description: 'Generate a swagger configuration', folder: 'interfaces/swagger' },
    { name: 'validationSchema', description: 'Generate a validation schema', folder: 'interfaces/validation-schemas' },
  ];

  // Register individual generators for each entity type
  generators.forEach(generator => {
    plop.setGenerator(generator.name, {
      description: generator.description,
      prompts: [...commonPrompts],
      actions: generateActions(generator.name, generator.folder),
    });
  });

  // Register middleware generator separately as it has additional prompts
  plop.setGenerator('middleware', {
    description: 'Generate a middleware with all related tests',
    prompts: [
      ...commonPrompts,
      {
        type: 'list',
        name: 'middlewareType',
        message: 'Which middleware are you generating?',
        choices: ['authMiddleware', 'permissionsMiddleware', 'validationMiddleware'],
      },
    ],
    actions: (data) => generateActions(data.middlewareType, 'interfaces/http/middlewares'),
  });

  // Batch Generator to generate all components at once
  plop.setGenerator('all', {
    description: 'Generate all components with all related tests',
    prompts: [...commonPrompts],
    actions: () => {
      // Create actions for each generator in the list
      let allActions = [];
      generators.forEach(generator => {
        allActions = allActions.concat(generateActions(generator.name, generator.folder));
      });

      // Add middleware-specific actions
      ['authMiddleware', 'permissionsMiddleware', 'validationMiddleware'].forEach(middleware => {
        allActions = allActions.concat(generateActions(middleware, 'interfaces/http/middlewares'));
      });

      return allActions;
    },
  });
};
