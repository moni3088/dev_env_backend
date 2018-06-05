let swaggerConfig = {
    swaggerDefinition: {
        info: {
            title: 'EventHub',
            version: '1.0.0',
            description: 'This is API for school project mysql'
        },
        basePath: '/',
        host: '',
        schemes: ['http', 'https'],
        produces: ['application/json'],
        consumes: ['application/json'],
    },
    apis: ['./src/routers/**/*.js'], // Path to the API docs
};

export default swaggerConfig;