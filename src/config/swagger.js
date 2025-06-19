import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'LogiRate API',
            version: '1.0.0',
            description: 'API documentation for LogiRate Platform'
            },
            servers: [
                {
                    url: ""
                },
            ],
    },
    apis: [`${__dirname}/../routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);
// console.log('Swagger paths:', JSON.stringify(swaggerSpec.paths, null, 2));

export {swaggerUi, swaggerSpec};