import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Management API',
            version: '1.0.0',
            description: 'API documentation for Room, Cabinet, and Cabinet Items management',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://your-production-url.com'
                    : `http://localhost:${process.env.PORT || 8080}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            }
        ],
        components: {
            schemas: {
                Response: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array'
                        },
                        message: {
                            type: 'string'
                        },
                        status: {
                            type: 'boolean'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // Docs in JSON format
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });

    console.log(`Docs available at http://localhost:${process.env.PORT || 8080}/api-docs`);
};