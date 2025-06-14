import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
                    url: "http://localhost:5000/"
                },
            ],
    },
    apis: ['../routes/authRoutes', './routes/reviewRoutes.js', './routes/vendorRoutes.js']
};

const swaggerSpec = swaggerJsdoc(options);

export {swaggerUi, swaggerSpec};