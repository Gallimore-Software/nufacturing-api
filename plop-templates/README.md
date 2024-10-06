Sure! Here's a README file that explains how to use your Plopfile to generate components for your project effectively:

---

# Plop Generator Guide for Nufacturing API

This guide will help you use Plop to generate various components for the `nufacturing-api` project. Plop is a tool that automates file creation using Handlebars templates, making development more efficient by reducing manual work.

## Table of Contents

- [Plop Generator Guide for Nufacturing API](#plop-generator-guide-for-nufacturing-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Available Generators](#available-generators)
  - [Using Plop](#using-plop)
  - [Generating Components](#generating-components)
    - [Generate a Specific Component](#generate-a-specific-component)
    - [Generate All Components](#generate-all-components)
  - [Templates](#templates)
    - [Templates Directory Structure](#templates-directory-structure)
  - [Troubleshooting](#troubleshooting)
  - [Best Practices](#best-practices)
  - [Example](#example)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

Before using Plop, you need to ensure that it is installed in your project. You can add Plop as a development dependency by running:

```sh
npm install --save-dev plop
```

If `rimraf` or other dependencies are needed for cleanup purposes, install them as well:

```sh
npm install --save-dev rimraf
```

## Available Generators

The Plopfile is configured to generate the following components:

- **Event Handler**
- **Mapper**
- **Service**
- **Use Case**
- **Entity**
- **Custom Error**
- **Event**
- **Repository Interface**
- **Persistence Config**
- **Event Dispatcher**
- **Logger**
- **Notification Handler**
- **Model**
- **Repository**
- **Scheduled Task**
- **DTO**
- **Controller**
- **Route**
- **Swagger Configuration**
- **Validation Schema**
- **Middleware (Auth, Permissions, Validation)**

## Using Plop

To run Plop and access the generator menu, use:

```sh
npx plop
```

This command will prompt you to choose from the available generators and provide details about the component you want to create.

## Generating Components

### Generate a Specific Component

1. Run the Plop command:

    ```sh
    npx plop
    ```

2. Select the specific generator you need from the list. For example, to generate a `controller`, choose:

    ```
    controller - Generate a controller
    ```

3. Provide the required information when prompted, such as the name of the entity.

4. The specified component files will be created in the appropriate folder, such as `interfaces/http/controllers/`.

### Generate All Components

You can also generate all components related to a particular entity using the `all` generator:

1. Run the Plop command:

    ```sh
    npx plop
    ```

2. Select the `all` generator:

    ```
    all - Generate all components with all related tests
    ```

3. Enter the name of the entity (e.g., `user`).

4. All the relevant files for that entity, including services, mappers, repositories, controllers, etc., will be created in their respective folders.

## Templates

The templates used by Plop are located in the `templates` directory. Each type of component has its own Handlebars `.hbs` files, which define the structure and boilerplate for the generated components.

### Templates Directory Structure

```
/templates
  ├── contract.ts.hbs
  ├── e2e.ts.hbs
  ├── integration.ts.hbs
  ├── performance.ts.hbs
  ├── security.ts.hbs
  ├── unit.ts.hbs
  └── entity.ts.hbs
```

Ensure that these `.hbs` files are available in the `templates` directory, and they are referenced correctly in the Plopfile.

## Troubleshooting

1. **Template Not Found**: If you see an error like `ENOENT: no such file or directory`, make sure the template file exists in the `templates` folder, and the path is correct in the Plopfile.

2. **Double Period in File Names**: If generated file paths have extra periods (e.g., `{{camelCase name}}..e2e.ts`), check the `generateActions` function in the Plopfile and ensure that the `.hbs` extension is being removed correctly without leaving extra characters.

3. **Overwrite Issues**: If a file already exists, the Plop generator will skip creating the file if you have `skipIfExists: true` set. Ensure this flag is correctly used to prevent unwanted overwriting.

4. **Aborted Due to Previous Failures**: When actions fail, subsequent ones may abort. Fix the root cause of the failure (e.g., missing templates, incorrect paths) before re-running Plop.

## Best Practices

- **Template Consistency**: Keep your `.hbs` files up to date and consistent across all types of components. This will ensure uniformity in your codebase.
  
- **Test Generated Files**: Once you generate a component, review and test it to ensure it meets the project's requirements. This will help catch any issues that might have been introduced due to template changes.

- **Modularize Templates**: Create reusable template snippets for commonly used code to maintain consistency and reduce redundancy in your `.hbs` files.

## Example

To generate a `user` entity, including all related components:

1. Run:

    ```sh
    npx plop
    ```

2. Select `all - Generate all components with all related tests`.

3. When prompted for the name, type `user`.

4. Plop will generate the following files in their respective folders:

    - `domain/entities/user.ts`
    - `interfaces/http/controllers/user.controller.ts`
    - `infrastructure/persistence/repositories/user.repository.ts`
    - **...and many more**.

## Contributing

If you need to add a new generator or modify existing ones:

1. Update the Plopfile (`plopfile.js`) with the new generator configuration.
2. Create new Handlebars templates in the `templates` folder.

Feel free to improve the generators or add more templates as the project evolves!

## License

This project is licensed under the MIT License.

---

This README should help you and your team effectively use the Plop generators to manage and scale your project without worrying about repetitive boilerplate code creation.