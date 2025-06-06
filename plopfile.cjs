module.exports = function (plop) {
    plop.setGenerator('create-tool', {
        description: 'Generate a TypeScript class and its test',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Tool name without suffix using PascalCase e.g. Search:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/tools/{{kebabCase name}}-tool/{{pascalCase name}}Tool.ts',
                templateFile: 'plop-templates/tool.hbs',
            },
            {
                type: 'add',
                path: 'src/tools/{{kebabCase name}}-tool/{{pascalCase name}}Tool.test.ts',
                templateFile: 'plop-templates/tool.test.hbs',
            },
            {
                type: 'append',
                path: 'src/index.ts',
                pattern: /(\/\/ INSERT NEW TOOL REGISTRATION HERE)/,
                template: 'new {{pascalCase name}}Tool().installTo(server);',
            },
            {
                type: 'append',
                path: 'src/index.ts',
                pattern: /(\/\/ INSERT NEW TOOL IMPORT HERE)/,
                template: "import { {{pascalCase name}}Tool } from './tools/{{kebabCase name}}-tool/{{pascalCase name}}Tool.js';",
            },
            {
                type: 'append',
                path: 'README.md',
                pattern: /(### Mapbox API tools)/,
                template: '\n\n#### {{titleCase name}} tool\n\nDescription goes here...\nUses the *Link to Mapbox API documentation here*',
            },
        ],
    });
};