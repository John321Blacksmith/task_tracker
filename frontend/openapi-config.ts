import {ConfigFile} from '@rtk-query/codegen-openapi';



const config: ConfigFile = {
    schemaFile: './api-scheme.json',
    apiFile: './src/store/api/api_init.ts',
    apiImport: 'tasksApi',
    outputFile: './src/store/api/hooks.ts',
    exportName: 'appApi',
    hooks: {
        queries: true,
        mutations: true,
        lazyQueries: true 
    }
}


export default config