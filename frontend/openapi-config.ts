import {ConfigFile} from '@rtk-query/codegen-openapi';



const config: ConfigFile = {
    schemaFile: './api-scheme.json',
    apiFile: './src/store/api/gen/api_init.ts',
    apiImport: 'tasksApi',
    outputFile: './src/store/api/gen/new_hooks.ts',
    exportName: 'appApi',
    hooks: {
        queries: true,
        mutations: true,
        lazyQueries: true 
    }
}


export default config
// npx @rtk-query/codegen-openapi openapi-config.ts