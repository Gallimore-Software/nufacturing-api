module.exports = function (plop) {
  // Common prompt for different types of entities
  const commonPrompts = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the entity?',
    },
  ];

  // Function to generate actions for each entity type
  const generateActions = (entityType, folderPath) => {
    const files = [
      'contract.ts.hbs',
      'e2e.ts.hbs',
      'integration.ts.hbs',
      'performance.ts.hbs',
      'security.ts.hbs',
      'unit.ts.hbs',
      'ts.hbs',
    ];

    return files.map((file) => ({
      type: 'add',
      path: `src/${folderPath}/{{kebabCase name}}/{{kebabCase name}}-${entityType.replace(/([A-Z])/g, '-$1').toLowerCase()}-${file.replace('.hbs', '')}`,
      templateFile: `plop-templates/${folderPath}/${entityType}.${file}`,
      abortOnFail: true, // Abort on failure
      skipIfExists: true, // Skip if file already exists
    }));
  };

  // Entity generators configuration
  const generators = [
    { name: 'eventHandler', description: 'Generate an event handler', folder: 'application/event-handlers' },
    { name: 'mapper', description: 'Generate a mapper', folder: 'application/mappers' },
    { name: 'service', description: 'Generate a service', folder: 'application/services' },
    { name: 'useCase', description: 'Generate a use case', folder: 'application/use-cases' },
    { name: 'entity', description: 'Generate an entity', folder: 'domain/entities' },
    { name: 'customError', description: 'Generate a custom error', folder: 'domain/errors' },
    { name: 'event', description: 'Generate an event', folder: 'domain/events' },
    { name: 'repositoryInterface', description: 'Generate a repository interface', folder: 'domain/interfaces/repositories' },
    { name: 'config', description: 'Generate a persistence config', folder: 'infrastructure/configs' },
    { name: 'eventDispatcher', description: 'Generate an event dispatcher', folder: 'infrastructure/event-dispatchers' },
    { name: 'logger', description: 'Generate a logger', folder: 'infrastructure/logging' },
    { name: 'notificationHandler', description: 'Generate a notification handler', folder: 'infrastructure/notifications' },
    { name: 'model', description: 'Generate a model', folder: 'infrastructure/persistence/models' },
    { name: 'repository', description: 'Generate a repository', folder: 'infrastructure/persistence/repositories' },
    { name: 'scheduledTasks', description: 'Generate a scheduled task', folder: 'infrastructure/scheduling' },
    { name: 'dto', description: 'Generate a DTO', folder: 'interfaces/dtos' },
    { name: 'controller', description: 'Generate a controller', folder: 'interfaces/http/controllers' },
    { name: 'routes', description: 'Generate a route', folder: 'interfaces/http/routes' },
    { name: 'swagger', description: 'Generate a swagger configuration', folder: 'interfaces/swagger' },
    { name: 'validationSchema', description: 'Generate a validation schema', folder: 'interfaces/validation-schemas' },
  ];

  // Register individual generators
  generators.forEach((generator) => {
    plop.setGenerator(generator.name, {
      description: generator.description,
      prompts: [...commonPrompts],
      actions: generateActions(generator.name, generator.folder),
    });
  });

  // Register middleware generator separately
  plop.setGenerator('middleware', {
    description: 'Generate a middleware with all related tests',
    prompts: [
      ...commonPrompts,
      {
        type: 'list',
        name: 'middlewareType',
        message: 'Which middleware are you generating?',
        choices: ['auth-middleware', 'permissions-middleware', 'validation-middleware'],
      },
    ],
    actions: (data) =>
      generateActions(data.middlewareType, 'interfaces/http/middlewares'),
  });

  // Batch generator to generate all components at once
  plop.setGenerator('all', {
    description: 'Generate all components with all related tests',
    prompts: [...commonPrompts],
    actions: () => {
      // Create actions for each generator
      let allActions = [];
      generators.forEach((generator) => {
        allActions = allActions.concat(generateActions(generator.name, generator.folder));
      });

      // Add middleware-specific actions
      ['auth-middleware', 'permissions-middleware', 'validation-middleware'].forEach((middleware) => {
        allActions = allActions.concat(
          generateActions(middleware, 'interfaces/http/middlewares')
        );
      });

      return allActions;
    },
  });
};
