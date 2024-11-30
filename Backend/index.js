import express from 'express';
import { config } from 'dotenv';
import { connection } from './db.js';
import CabinetRouter from './routes/Cabinet.route.js';
import RoomRouter from './routes/Room.route.js';
import CabinetItemRouter from './routes/CabinetItem.route.js';
import cors from 'cors';
config();
const app = express();
app.use(cors({
    origin: ['http://localhost:5173', "https://shrutika-app-plotnew.vercel.app"], // Your Vite dev server URL
    // credentials: true 
}));
// Middleware to parse JSON requests
app.use(express.json());

// Use the routers
app.use(CabinetRouter);
app.use(RoomRouter);
app.use(CabinetItemRouter);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Internal Server Error" });
});

connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
});