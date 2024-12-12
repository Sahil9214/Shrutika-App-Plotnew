import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db.js';
import CabinetRouter from './routes/Cabinet.route.js';
import RoomRouter from './routes/Room.route.js';
import CabinetItemRouter from './routes/CabinetItem.route.js';
import cors from 'cors';
import { swaggerDocs } from './swagger.js';

const app = express();

// Middleware order is important
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    next();
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});

// Use the routers
app.use(CabinetRouter);
app.use(RoomRouter);
app.use(CabinetItemRouter);

// Swagger documentation
swaggerDocs(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8080;
connection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});