import {ConfigFile} from '@rtk-query/codegen-openapi';



const config: ConfigFile = {
    schemaFile: './schema.json',
    apiFile: './store/api/api_init.ts',
    apiImport: 'tasksApi',
    outputFile: './store/api/hooks.ts',
    exportName: 'appApi',
    hooks: {
        queries: true,
        mutations: true,
        lazyQueries: true 
    }
}


export default config